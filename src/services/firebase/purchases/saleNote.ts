import { SaleNote } from '@src/types/purchases';
import { FirestoreDataConverter } from 'firebase/firestore';

export const saleNoteConverter: FirestoreDataConverter<SaleNote> = {
  toFirestore: (invoice: SaleNote) => invoice,
  fromFirestore: (snapshot: any) => ({
    ...snapshot.data(),
    issueDate: snapshot.data().issueDate.toDate(),
  }),
};
