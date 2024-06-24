import { PROJECTS_INITIAL_VALUE } from '@src/lib/constants/projects';
import { COLLECTIONS } from '@src/lib/enums/collections';
import { converterByType } from '@src/services/firebase/expenses/converters';
import {
  docReferencer,
  previousProjectReferencer,
} from '@src/services/firebase/expenses/docReferencer';
import { ExpenseParserByType } from '@src/services/firebase/expenses/parsers';
import { DB } from '@src/settings/firebase';
import {
  DayBookTransaction,
  DayBookTransactionDetail,
} from '@src/types/dayBook';
import {
  Expense,
  ExpenseTypeValues,
  ExtendedGeneralExpense,
  GeneralExpense,
} from '@src/types/expenses';
import { Project } from '@src/types/projects';
import {
  collection,
  getDocs,
  query,
  runTransaction,
  where,
} from 'firebase/firestore';

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
      project_id: projectDocRef?.id ?? '',
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
    const { previousProjectDoc } = await previousProjectReferencer(
      transaction,
      expenseDocRef
    );

    /*
     * Data manipulation
     */

    // Daybook manipulation
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

    // Previous project manipulation
    let previousProject: Project = PROJECTS_INITIAL_VALUE;
    if (previousProjectDoc) {
      previousProject = previousProjectDoc.data();
      previousProject.received_vouchers =
        previousProject.received_vouchers.filter(
          (voucher) => voucher.id !== expenseDocRef.id
        );
    }

    // Project manipulation
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
    if (previousProjectDoc) {
      transaction.set(previousProjectDoc.ref, previousProject);
    }
  });

  return newExpense;
}

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
