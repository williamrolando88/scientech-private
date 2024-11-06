import { ReceivedInvoice } from '@src/types/purchases';
import { FirestoreDataConverter } from 'firebase/firestore';

export const receivedInvoiceConverter: FirestoreDataConverter<ReceivedInvoice> =
  {
    toFirestore: (invoice: ReceivedInvoice) => invoice,
    fromFirestore: (snapshot: any) => ({
      ...snapshot.data(),
      issueDate: snapshot.data().issueDate.toDate(),
    }),
  };
