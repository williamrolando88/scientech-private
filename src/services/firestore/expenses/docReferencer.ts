import { COLLECTIONS } from '@src/lib/enums/collections';
import { DayBookTransactionConverter } from '@src/services/firebase/dayBookTransactions';
import { GeneralExpenseConverter } from '@src/services/firebase/expenses/converters';
import { ProjectConverter } from '@src/services/firebase/projects';
import { DB } from '@src/settings/firebase';
import { ExtendedGeneralExpenseOld, GeneralExpenseOld } from '@src/types/expenses';
import { Project } from '@src/types/projects';
import { collection, doc, DocumentReference, Transaction } from 'firebase/firestore';

export const docReferencer = (
  expense: ExtendedGeneralExpenseOld | GeneralExpenseOld,
) => {
  const expensesCollection = collection(DB, COLLECTIONS.EXPENSES);
  const projectsCollection = collection(DB, COLLECTIONS.PROJECTS);
  const dayBookCollection = collection(DB, COLLECTIONS.DAY_BOOK_TRANSACTIONS);

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
      ProjectConverter,
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
  expenseDocRef: DocumentReference<GeneralExpenseOld>,
) => {
  // Check for previous linked projects
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
    COLLECTIONS.PROJECTS,
    previousProjectId,
  ).withConverter(ProjectConverter);
  const previousProjectDoc = await transaction.get(previousProjectRef);

  if (!previousProjectDoc.exists()) {
    return {};
  }

  return { previousProjectDoc };
};