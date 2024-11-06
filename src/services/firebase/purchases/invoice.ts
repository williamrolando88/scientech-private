import { COLLECTIONS } from '@src/lib/enums/collections';
import { DB } from '@src/settings/firebase';
import { ReceivedInvoice } from '@src/types/purchases';
import {
  collection,
  deleteDoc,
  doc,
  FirestoreDataConverter,
  setDoc,
} from 'firebase/firestore';

export const receivedInvoiceConverter: FirestoreDataConverter<ReceivedInvoice> =
  {
    toFirestore: (invoice: ReceivedInvoice) => invoice,
    fromFirestore: (snapshot: any) => ({
      ...snapshot.data(),
      issueDate: snapshot.data().issueDate.toDate(),
    }),
  };

const upsert = async (invoice: ReceivedInvoice): Promise<string> => {
  const docCollection = collection(DB, COLLECTIONS.INVOICES);
  const docRef = doc(docCollection, invoice.id).withConverter(
    receivedInvoiceConverter
  );
  await setDoc(docRef, invoice);
  return docRef.id;
};

const remove = async (id: string) => {
  const docRef = doc(DB, COLLECTIONS.INVOICES, id);
  await deleteDoc(docRef);

  return id;
};

export const FirestoreReceivedInvoice = {
  upsert,
  remove,
};
