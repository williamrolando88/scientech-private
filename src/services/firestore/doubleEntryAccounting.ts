import { COLLECTIONS_ENUM } from '@src/lib/enums/collections';
import { DB } from '@src/settings/firebase';
import { DoubleEntryAccounting } from '@src/types/doubleEntryAccounting';
import {
  collection,
  deleteDoc,
  doc,
  FirestoreDataConverter,
  setDoc,
} from 'firebase/firestore';

export const doubleEntryAccountingConverter: FirestoreDataConverter<DoubleEntryAccounting> =
  {
    toFirestore: (data: DoubleEntryAccounting) => data,
    fromFirestore: (snapshot: any) => ({
      ...snapshot.data(),
      issueDate: snapshot.data().issueDate.toDate(),
      createdAt: snapshot.data().createdAt.toDate(),
      updatedAt: snapshot.data().updatedAt.toDate(),
    }),
  };

const upsert = async (invoice: DoubleEntryAccounting): Promise<string> => {
  const docCollection = collection(
    DB,
    COLLECTIONS_ENUM.DOUBLE_ENTRY_ACCOUNTING
  );

  let docRef;
  if (invoice.id) {
    docRef = doc(docCollection, invoice.id).withConverter(
      doubleEntryAccountingConverter
    );
    invoice.updatedAt = new Date();
  } else {
    docRef = doc(docCollection).withConverter(doubleEntryAccountingConverter);
    invoice.id = docRef.id;
    invoice.createdAt = new Date();
    invoice.updatedAt = new Date();
  }

  await setDoc(docRef, invoice);
  return docRef.id;
};

const remove = async (id: string) => {
  const docRef = doc(DB, COLLECTIONS_ENUM.DOUBLE_ENTRY_ACCOUNTING, id);
  await deleteDoc(docRef);
};

export const FirestoreDoubleEntryAccounting = {
  upsert,
  remove,
};
