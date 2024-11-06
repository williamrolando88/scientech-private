import { CustomsPayment } from '@src/types/purchases';
import { FirestoreDataConverter } from 'firebase/firestore';

export const customsPaymentsConverter: FirestoreDataConverter<CustomsPayment> =
  {
    toFirestore: (customsPayment: CustomsPayment) => customsPayment,
    fromFirestore: (snapshot: any) => ({
      ...snapshot.data(),
      issueDate: snapshot.data().issueDate.toDate(),
    }),
  };
