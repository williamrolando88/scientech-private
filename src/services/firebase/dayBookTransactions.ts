import { collection, doc, setDoc } from 'firebase/firestore';
import { COLLECTIONS } from 'src/lib/enums/collections';
import { DB } from 'src/settings/firebase';
import { DayBookTransaction } from 'src/types/dayBook';

const upsert = async (transaction: DayBookTransaction): Promise<string> => {
  const date = new Date();
  const { id } = transaction;
  let docRef;

  if (id) {
    docRef = doc(DB, COLLECTIONS.DAY_BOOK_TRANSACTIONS, id);
    transaction.updatedAt = date;
  } else {
    docRef = doc(collection(DB, COLLECTIONS.DAY_BOOK_TRANSACTIONS));
    transaction.createdAt = date;
    transaction.updatedAt = date;
    transaction.id = docRef.id;
  }

  await setDoc(docRef, transaction);

  return docRef.id;
};

export const DayBookTransactions = {
  upsert,
};
