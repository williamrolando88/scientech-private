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
import { COLLECTIONS_ENUM } from 'src/lib/enums/collections';
import { DB } from 'src/settings/firebase';
import {
  DayBookTransactionFirestoreOld,
  DayBookTransactionOld,
} from 'src/types/dayBook';

export const DayBookTransactionConverter: FirestoreDataConverter<DayBookTransactionOld> =
  {
    toFirestore: (data: DayBookTransactionOld) => data,
    fromFirestore: (
      snap: QueryDocumentSnapshot<
        DayBookTransactionFirestoreOld,
        DayBookTransactionOld
      >
    ) => ({
      ...snap.data(),
      createdAt: snap.data().createdAt.toDate(),
      updatedAt: snap.data().updatedAt.toDate(),
      date: snap.data().date.toDate(),
    }),
  };

const upsert = async (transaction: DayBookTransactionOld): Promise<string> => {
  const date = new Date();
  const { id } = transaction;
  let docRef;
  const docCollection = collection(DB, COLLECTIONS_ENUM.DAY_BOOK_TRANSACTIONS);

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

const list = async (): Promise<DayBookTransactionOld[]> => {
  const q = query(
    collection(DB, COLLECTIONS_ENUM.DAY_BOOK_TRANSACTIONS).withConverter(
      DayBookTransactionConverter
    ),
    orderBy('date', 'desc')
  );
  const querySnapshot = await getDocs(q);

  const transactions: DayBookTransactionOld[] = [];
  querySnapshot.forEach((document) => {
    transactions.push(document.data());
  });

  return transactions;
};

const remove = async (id: string) => {
  const docRef = doc(
    collection(DB, COLLECTIONS_ENUM.DAY_BOOK_TRANSACTIONS),
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
