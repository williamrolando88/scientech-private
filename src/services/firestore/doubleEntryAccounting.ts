import { DoubleEntryAccounting } from '@src/types/doubleEntryAccounting';
import { deleteDoc, doc, setDoc } from 'firebase/firestore';
import { COLLECTIONS } from './collections';

const upsert = async (invoice: DoubleEntryAccounting): Promise<string> => {
  let docRef;
  if (invoice.id) {
    docRef = doc(COLLECTIONS.DOUBLE_ENTRY_ACCOUNTING, invoice.id);
    invoice.updatedAt = new Date();
  } else {
    docRef = doc(COLLECTIONS.DOUBLE_ENTRY_ACCOUNTING);
    invoice.id = docRef.id;
    invoice.createdAt = new Date();
    invoice.updatedAt = new Date();
  }

  await setDoc(docRef, invoice);
  return docRef.id;
};

const remove = async (id: string) => {
  const docRef = doc(COLLECTIONS.DOUBLE_ENTRY_ACCOUNTING, id);
  await deleteDoc(docRef);
};

export const FirestoreDoubleEntryAccounting = {
  upsert,
  remove,
};
