import { COLLECTIONS_ENUM } from '@src/lib/enums/collections';
import { DayBookTransactionConverter } from '@src/services/firestore/dayBookTransactions';
import { GeneralExpenseConverter } from '@src/services/firestore/expenses/converters';
import { ProjectConverter } from '@src/services/firestore/projects';
import { DB } from '@src/settings/firebase';
import {
  ExtendedGeneralExpenseOld,
  GeneralExpenseOld,
} from '@src/types/expenses';
import { Project } from '@src/types/projects';
import {
  collection,
  doc,
  DocumentReference,
  Transaction,
} from 'firebase/firestore';

export const docReferencer = (
  expense: ExtendedGeneralExpenseOld | GeneralExpenseOld
) => {
  const expensesCollection = collection(DB, COLLECTIONS_ENUM.EXPENSES);
  const projectsCollection = collection(DB, COLLECTIONS_ENUM.PROJECTS);
  const dayBookCollection = collection(
    DB,
    COLLECTIONS_ENUM.DAY_BOOK_TRANSACTIONS
  );

  let expenseDocRef: DocumentReference;
  let dayBookDocRef: DocumentReference;
  let projectDocRef: DocumentReference<Project> | null;

  if (expense.id) {
    expenseDocRef = doc(expensesCollection, expense.id);
  } else {
    expenseDocRef = doc(expensesCollection);
  }

  if (expense.day_book_transaction_id) {
    dayBookDocRef = doc(dayBookCollection, expense.day_book_transaction_id);
  } else {
    dayBookDocRef = doc(dayBookCollection);
  }

  if (expense.project_id) {
    projectDocRef = doc(projectsCollection, expense.project_id).withConverter(
      ProjectConverter
    );
  } else {
    projectDocRef = null;
  }

  return {
    expenseDocRef: expenseDocRef.withConverter(GeneralExpenseConverter),
    dayBookDocRef: dayBookDocRef.withConverter(DayBookTransactionConverter),
    projectDocRef,
  };
};

export const previousProjectReferencer = async (
  transaction: Transaction,
  expenseDocRef: DocumentReference<GeneralExpenseOld>
) => {
  // TODO: Check for previous linked projects
  const storedExpenseDoc = await transaction.get(expenseDocRef);

  if (!storedExpenseDoc.exists()) {
    return {};
  }

  const previousProjectId = storedExpenseDoc.data()?.project_id;

  if (!previousProjectId) {
    return {};
  }

  const previousProjectRef = doc(
    DB,
    COLLECTIONS_ENUM.PROJECTS,
    previousProjectId
  ).withConverter(ProjectConverter);
  const previousProjectDoc = await transaction.get(previousProjectRef);

  if (!previousProjectDoc.exists()) {
    return {};
  }

  return { previousProjectDoc };
};
