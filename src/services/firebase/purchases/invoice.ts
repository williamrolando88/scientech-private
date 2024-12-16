import { COLLECTIONS } from '@src/lib/enums/collections';
import { DB } from '@src/settings/firebase';
import { ReceivedInvoice } from '@src/types/purchases';
import {
  collection,
  deleteDoc,
  doc,
  FirestoreDataConverter,
  getDocs,
  query,
  setDoc,
  where,
} from 'firebase/firestore';

export const receivedInvoiceConverter: FirestoreDataConverter<ReceivedInvoice> =
  {
    toFirestore: (invoice: ReceivedInvoice) => invoice,
    fromFirestore: (snapshot: any) => ({
      ...snapshot.data(),
      issueDate: snapshot.data().issueDate.toDate(),
    }),
  };

const checkDuplicated = async (invoice: ReceivedInvoice) => {
  if (invoice.id) return;

  const docCollection = collection(DB, COLLECTIONS.RECEIVED_INVOICES);
  const querySnapshot = query(
    docCollection,
    where('issuerId', '==', invoice.issuerId),
    where('sequentialNumber', '==', invoice.sequentialNumber),
    where('emissionPoint', '==', invoice.emissionPoint),
    where('establishment', '==', invoice.establishment)
  );

  if (!(await getDocs(querySnapshot)).empty) {
    throw new Error('Factura duplicada');
  }
};

const upsert = async (invoice: ReceivedInvoice): Promise<string> => {
  await checkDuplicated(invoice);

  const docCollection = collection(DB, COLLECTIONS.RECEIVED_INVOICES);

  let docRef;
  if (invoice.id) {
    docRef = doc(docCollection, invoice.id).withConverter(
      receivedInvoiceConverter
    );
  } else {
    docRef = doc(docCollection).withConverter(receivedInvoiceConverter);
    invoice.id = docRef.id;
  }

  await setDoc(docRef, invoice);
  return docRef.id;
};

const remove = async (id: string) => {
  const docRef = doc(DB, COLLECTIONS.RECEIVED_INVOICES, id);
  await deleteDoc(docRef);
};

export const FirestoreReceivedInvoice = {
  upsert,
  remove,
};
