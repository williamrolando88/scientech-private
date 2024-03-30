import {
  FirestoreDataConverter,
  QueryDocumentSnapshot,
  collection,
  deleteDoc,
  doc,
  getDocs,
  orderBy,
  query,
  setDoc,
} from 'firebase/firestore';
import { COLLECTIONS } from 'src/lib/enums/collections';
import { DB } from 'src/settings/firebase';
import {
  DayBookTransaction,
  DayBookTransactionFirestore,
} from 'src/types/dayBook';

export const DayBookTransactionConverter: FirestoreDataConverter<DayBookTransaction> =
  {
    toFirestore: (data: DayBookTransaction) => data,
    fromFirestore: (
      snap: QueryDocumentSnapshot<
        DayBookTransactionFirestore,
        DayBookTransaction
      >
    ) => ({
      ...snap.data(),
      createdAt: snap.data().createdAt.toDate(),
      updatedAt: snap.data().updatedAt.toDate(),
      date: snap.data().date.toDate(),
    }),
  };

const upsert = async (transaction: DayBookTransaction): Promise<string> => {
  const date = new Date();
  const { id } = transaction;
  let docRef;
  const docCollection = collection(DB, COLLECTIONS.DAY_BOOK_TRANSACTIONS);

  if (id) {
    docRef = doc(docCollection, id).withConverter(DayBookTransactionConverter);
    transaction.updatedAt = date;
  } else {
    docRef = doc(docCollection).withConverter(DayBookTransactionConverter);
    transaction.createdAt = date;
    transaction.updatedAt = date;
    transaction.id = docRef.id;
  }

  await setDoc(docRef, transaction);

  return docRef.id;
};

const list = async (): Promise<DayBookTransaction[]> => {
  const q = query(
    collection(DB, COLLECTIONS.DAY_BOOK_TRANSACTIONS).withConverter(
      DayBookTransactionConverter
    ),
    orderBy('date', 'desc')
  );
  const querySnapshot = await getDocs(q);

  const transactions: DayBookTransaction[] = [];
  querySnapshot.forEach((document) => {
    transactions.push(document.data());
  });

  return transactions;
};

const remove = async (id: string) => {
  const docRef = doc(
    collection(DB, COLLECTIONS.DAY_BOOK_TRANSACTIONS),
    id
  ).withConverter(DayBookTransactionConverter);

  await deleteDoc(docRef);

  return id;
};

export const DayBookTransactions = {
  upsert,
  list,
  remove,
};
