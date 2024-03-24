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
  ExpenseType,
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
  deleteDoc,
  doc,
  getDocs,
  orderBy,
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
    issue_date: snapshot.data().issuer_date.toDate(),
  }),
};

const InvoiceConverter: FirestoreDataConverter<Invoice> = {
  toFirestore: (expense: Invoice) => expense,
  fromFirestore: (snapshot: any) => ({
    ...snapshot.data(),
    issue_date: snapshot.data().issuer_date.toDate(),
  }),
};

const CustomsPaymentConverter: FirestoreDataConverter<CustomsPayment> = {
  toFirestore: (expense: CustomsPayment) => expense,
  fromFirestore: (snapshot: any) => ({
    ...snapshot.data(),
    issue_date: snapshot.data().issuer_date.toDate(),
  }),
};

const ExpenseConverter: FirestoreDataConverter<Expense> = {
  toFirestore: (expense: Expense) => expense,
  fromFirestore: (snapshot: any) => ({
    ...snapshot.data(),
    issue_date: snapshot.data().issuer_date.toDate(),
  }),
};

const converterByType: Record<
  ExpenseType,
  FirestoreDataConverter<GeneralExpense>
> = {
  invoice: InvoiceConverter,
  customs_payment: CustomsPaymentConverter,
  sale_note: ExpenseConverter,
  non_deductible: ExpenseConverter,
};

export const ExpenseParserByType: Record<ExpenseType, ZodSchema> = {
  invoice: InvoiceSchema,
  customs_payment: CustomsPaymentSchema,
  non_deductible: ExpensesCommonSchema,
  sale_note: ExpensesCommonSchema,
};

// !needs update
async function listByType<T>(type: ExpenseType): Promise<T[]> {
  const q = query(
    collection(DB, COLLECTIONS.EXPENSES),
    orderBy('issuer_date', 'desc'),
    where('type', '==', type)
  ).withConverter(converterByType[type]);

  const querySnapshot = await getDocs(q);

  const expenses: T[] = [];
  querySnapshot.forEach((document) => {
    expenses.push(document.data() as T);
  });

  return expenses;
}

async function upsert(
  expense: ExtendedGeneralExpense
): Promise<GeneralExpense> {
  const timestamp = new Date();
  const expensesCollection = collection(DB, COLLECTIONS.EXPENSES);
  const projectsCollection = collection(DB, COLLECTIONS.PROJECTS);
  const dayBookCollection = collection(DB, COLLECTIONS.DAY_BOOK_TRANSACTIONS);

  let expenseDocRef: DocumentReference<GeneralExpense, DocumentData>;
  let dayBookDocRef: DocumentReference<DayBookTransaction, DocumentData>;
  let projectDocRef: DocumentReference<Project, DocumentData>;

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
  }

  const transactions: DayBookTransactionDetail[] =
    expense.transaction_details.map((transaction) => ({
      ...transaction,
      expense_id: expenseDocRef.id,
    }));

  const newExpense = ExpenseParserByType[expense.type].parse(
    expense
  ) as GeneralExpense;

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

    // Set operations
    transaction.set(dayBookDocRef, newDayBookDoc);
    transaction.set(expenseDocRef, newExpense);
    if (projectDocRef && storedProjectDoc?.exists()) {
      transaction.set(projectDocRef, newProject);
    }
  });

  return newExpense;
}

// !needs update
const remove = async (id: string) => {
  const docRef = doc(DB, COLLECTIONS.EXPENSES, id);
  await deleteDoc(docRef);

  return id;
};

export const Expenses = {
  listByType,
  upsert,
  remove,
};
