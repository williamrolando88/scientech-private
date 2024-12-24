import { COLLECTIONS } from '@src/lib/enums/collections';
import { DB } from '@src/settings/firebase';
import { Payment } from '@src/types/payment';
import {
  collection,
  doc,
  FirestoreDataConverter,
  setDoc,
} from 'firebase/firestore';

export const PaymentConverter: FirestoreDataConverter<Payment> = {
  toFirestore: (data: Payment) => data,
  fromFirestore: (snap: any) => ({
    ...snap.data(),
    createdAt: snap.data().createdAt.toDate(),
  }),
};

// TODO: Add transaction to register payment in purchase document
const registerPayment = async (payment: Payment) => {
  const docCollection = collection(DB, COLLECTIONS.PAYMENTS);

  const docRef = doc(docCollection).withConverter(PaymentConverter);

  await setDoc(docRef, payment);
  return docRef.id;
};

export const PaymentFirebase = { registerPayment };
