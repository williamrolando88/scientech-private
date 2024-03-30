import { PROJECTS_INITIAL_VALUE } from '@src/lib/constants/projects';
import { COLLECTIONS } from '@src/lib/enums/collections';
import {
  CustomsPaymentSchema,
  ExpensesCommonSchema,
  InvoiceSchema,
} from '@src/lib/schemas/expenses';
import { DB } from '@src/settings/firebase';
import {
  DayBookTransaction,
  DayBookTransactionDetail,
} from '@src/types/dayBook';
import {
  CustomsPayment,
  Expense,
  ExpenseTypeValues,
  ExtendedGeneralExpense,
  GeneralExpense,
  Invoice,
} from '@src/types/expenses';
import { Project } from '@src/types/projects';
import {
  DocumentData,
  DocumentReference,
  FirestoreDataConverter,
  collection,
  doc,
  getDocs,
  query,
  runTransaction,
  where,
} from 'firebase/firestore';
import { ZodSchema } from 'zod';
import { DayBookTransactionConverter } from './dayBookTransactions';
import { ProjectConverter } from './projects';

const GeneralExpenseConverter: FirestoreDataConverter<GeneralExpense> = {
  toFirestore: (expense: GeneralExpense) => expense,
  fromFirestore: (snapshot: any) => ({
    ...snapshot.data(),
    issue_date: snapshot.data().issue_date.toDate(),
  }),
};

const InvoiceConverter: FirestoreDataConverter<Invoice> = {
  toFirestore: (expense: Invoice) => expense,
  fromFirestore: (snapshot: any) => ({
    ...snapshot.data(),
    issue_date: snapshot.data().issue_date.toDate(),
  }),
};

const CustomsPaymentConverter: FirestoreDataConverter<CustomsPayment> = {
  toFirestore: (expense: CustomsPayment) => expense,
  fromFirestore: (snapshot: any) => ({
    ...snapshot.data(),
    issue_date: snapshot.data().issue_date.toDate(),
  }),
};

const ExpenseConverter: FirestoreDataConverter<Expense> = {
  toFirestore: (expense: Expense) => expense,
  fromFirestore: (snapshot: any) => ({
    ...snapshot.data(),
    issue_date: snapshot.data().issue_date.toDate(),
  }),
};

const converterByType: Record<
  ExpenseTypeValues,
  FirestoreDataConverter<GeneralExpense>
> = {
  invoice: InvoiceConverter,
  customs_payment: CustomsPaymentConverter,
  sale_note: ExpenseConverter,
  non_deductible: ExpenseConverter,
};

export const ExpenseParserByType: Record<ExpenseTypeValues, ZodSchema> = {
  invoice: InvoiceSchema,
  customs_payment: CustomsPaymentSchema,
  non_deductible: ExpensesCommonSchema,
  sale_note: ExpensesCommonSchema,
};

const docReferencer = (expense: ExtendedGeneralExpense | GeneralExpense) => {
  const expensesCollection = collection(DB, COLLECTIONS.EXPENSES);
  const projectsCollection = collection(DB, COLLECTIONS.PROJECTS);
  const dayBookCollection = collection(DB, COLLECTIONS.DAY_BOOK_TRANSACTIONS);

  let expenseDocRef: DocumentReference<GeneralExpense, DocumentData>;
  let dayBookDocRef: DocumentReference<DayBookTransaction, DocumentData>;
  let projectDocRef: DocumentReference<Project, DocumentData> | null;

  if (expense.id) {
    expenseDocRef = doc(expensesCollection, expense.id).withConverter(
      GeneralExpenseConverter
    );
  } else {
    expenseDocRef = doc(expensesCollection).withConverter(
      GeneralExpenseConverter
    );
  }

  if (expense.day_book_transaction_id) {
    dayBookDocRef = doc(
      dayBookCollection,
      expense.day_book_transaction_id
    ).withConverter(DayBookTransactionConverter);
  } else {
    dayBookDocRef = doc(dayBookCollection).withConverter(
      DayBookTransactionConverter
    );
  }

  if (expense.project_id) {
    projectDocRef = doc(projectsCollection, expense.project_id).withConverter(
      ProjectConverter
    );
  } else {
    projectDocRef = null;
  }

  return { expenseDocRef, dayBookDocRef, projectDocRef };
};

const listByType = (type: ExpenseTypeValues) => {
  const converter = converterByType[type];

  return async () => {
    const q = query(
      collection(DB, COLLECTIONS.EXPENSES),
      where('type', '==', type)
    ).withConverter(converter);

    const querySnapshot = await getDocs(q);

    const expenses = querySnapshot.docs.map((document) => document.data());

    expenses.sort(
      (a, b) =>
        new Date(b.issue_date).getTime() - new Date(a.issue_date).getTime()
    );

    return expenses as unknown[];
  };
};

async function upsert(
  expense: ExtendedGeneralExpense
): Promise<GeneralExpense> {
  const timestamp = new Date();

  const { dayBookDocRef, expenseDocRef, projectDocRef } =
    docReferencer(expense);

  const transactions: DayBookTransactionDetail[] =
    expense.transaction_details.map((transaction) => ({
      ...transaction,
      expense_id: expenseDocRef.id,
    }));

  let newExpense: Expense = {
    issue_date: expense.issue_date,
    total: expense.total,
    type: expense.type,
  };

  await runTransaction(DB, async (transaction) => {
    // Read operations
    const storedDayBookDoc = await transaction.get(dayBookDocRef);
    const storedProjectDoc =
      projectDocRef && (await transaction.get(projectDocRef));

    // Data manipulation
    const newDayBookDoc: DayBookTransaction = {
      date: expense.issue_date,
      transactions,
      createdAt: timestamp,
      id: dayBookDocRef.id,
      locked: true,
      updatedAt: timestamp,
    };
    if (storedDayBookDoc.exists()) {
      newDayBookDoc.createdAt = storedDayBookDoc.data().createdAt;
    }

    let newProject: Project = PROJECTS_INITIAL_VALUE;
    if (projectDocRef && storedProjectDoc?.exists()) {
      newProject = storedProjectDoc?.data();
      newProject.received_vouchers = [
        ...newProject.received_vouchers,
        {
          id: expenseDocRef.id,
          type: expense.type,
        },
      ];
    }

    newExpense = { ...ExpenseParserByType[expense.type].parse(expense) };
    newExpense.day_book_transaction_id = dayBookDocRef.id;
    newExpense.id = expenseDocRef.id;

    // Set operations
    transaction.set(dayBookDocRef, newDayBookDoc);
    transaction.set(expenseDocRef, newExpense);
    if (projectDocRef && storedProjectDoc?.exists()) {
      transaction.set(projectDocRef, newProject);
    }
  });

  return newExpense;
}

// !needs update, it should delete the day book transaction and filter the expenses from the project
const remove = async (expense: GeneralExpense) => {
  const { dayBookDocRef, expenseDocRef, projectDocRef } =
    docReferencer(expense);

  await runTransaction(DB, async (transaction) => {
    // Read operations
    const storedProjectDoc =
      projectDocRef && (await transaction.get(projectDocRef));

    // Data manipulation
    let newProject: Project = PROJECTS_INITIAL_VALUE;
    if (projectDocRef && storedProjectDoc?.exists()) {
      newProject = storedProjectDoc?.data();
      newProject.received_vouchers = newProject.received_vouchers.filter(
        (voucher) => voucher.id !== expenseDocRef.id
      );
    }

    // Set operations
    if (projectDocRef && storedProjectDoc?.exists()) {
      transaction.set(projectDocRef, newProject);
    }

    // Delete operations
    transaction.delete(dayBookDocRef);
    transaction.delete(expenseDocRef);
  });

  return expense.id;
};

export const Expenses = {
  listByType,
  upsert,
  remove,
};
