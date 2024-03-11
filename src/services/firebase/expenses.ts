import { COLLECTIONS } from '@src/lib/enums/collections';
import { DB } from '@src/settings/firebase';
import {
  CustomsPayment,
  Expense,
  ExpenseType,
  GeneralExpense,
  Invoice,
} from '@src/types/expenses';
import {
  FirestoreDataConverter,
  collection,
  deleteDoc,
  doc,
  getDocs,
  orderBy,
  query,
  setDoc,
  where,
} from 'firebase/firestore';

const GeneralExpenseConverter: FirestoreDataConverter<GeneralExpense> = {
  toFirestore: (expense: GeneralExpense) => expense,
  fromFirestore: (snapshot: any) => ({
    ...snapshot.data(),
    issuer_date: snapshot.data().issuer_date.toDate(),
  }),
};

const InvoiceConverter: FirestoreDataConverter<Invoice> = {
  toFirestore: (expense: Invoice) => expense,
  fromFirestore: (snapshot: any) => ({
    ...snapshot.data(),
    issuer_date: snapshot.data().issuer_date.toDate(),
  }),
};

const CustomsPaymentConverter: FirestoreDataConverter<CustomsPayment> = {
  toFirestore: (expense: CustomsPayment) => expense,
  fromFirestore: (snapshot: any) => ({
    ...snapshot.data(),
    issuer_date: snapshot.data().issuer_date.toDate(),
  }),
};

const ExpenseConverter: FirestoreDataConverter<Expense> = {
  toFirestore: (expense: Expense) => expense,
  fromFirestore: (snapshot: any) => ({
    ...snapshot.data(),
    issuer_date: snapshot.data().issuer_date.toDate(),
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

async function upsert(expense: GeneralExpense): Promise<string> {
  const docCollection = collection(DB, COLLECTIONS.EXPENSES);
  let docRef;

  if (expense.id) {
    docRef = doc(docCollection, expense.id).withConverter(
      GeneralExpenseConverter
    );
  } else {
    docRef = doc(docCollection).withConverter(GeneralExpenseConverter);
  }

  await setDoc(docRef, expense);
  return docRef.id;
}

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
