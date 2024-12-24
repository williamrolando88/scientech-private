import { COLLECTIONS } from '@src/lib/enums/collections';
import { DB } from '@src/settings/firebase';
import { NonDeductible } from '@src/types/purchases';
import {
  collection,
  deleteDoc,
  doc,
  FirestoreDataConverter,
  setDoc,
} from 'firebase/firestore';

export const nonDeductibleConverter: FirestoreDataConverter<NonDeductible> = {
  toFirestore: (invoice: NonDeductible) => invoice,
  fromFirestore: (snapshot: any) => ({
    ...snapshot.data(),
    issueDate: snapshot.data().issueDate.toDate(),
  }),
};

const upsert = async (invoice: NonDeductible): Promise<string> => {
  const docCollection = collection(DB, COLLECTIONS.NON_DEDUCTIBLEs);

  let docRef;
  if (invoice.id) {
    docRef = doc(docCollection, invoice.id).withConverter(
      nonDeductibleConverter
    );
  } else {
    docRef = doc(docCollection).withConverter(nonDeductibleConverter);
    invoice.id = docRef.id;
  }

  await setDoc(docRef, invoice);
  return docRef.id;
};

const remove = async (id: string) => {
  const docRef = doc(DB, COLLECTIONS.NON_DEDUCTIBLEs, id);
  await deleteDoc(docRef);
};

export const FirestoreNonDeductible = {
  upsert,
  remove,
};
