import { Purchase } from '@src/types/purchases';
import {
  DocumentData,
  FirestoreDataConverter,
  QueryDocumentSnapshot,
} from 'firebase/firestore';

// TODO: Update how the data it's shown in the tables

export const purchaseConverter: FirestoreDataConverter<Purchase> = {
  toFirestore: (purchase: Purchase) => purchase,
  fromFirestore: (snapshot: QueryDocumentSnapshot<Purchase, DocumentData>) =>
    ({
      ...snapshot.data(),
      purchaseData: {
        ...snapshot.data().purchaseData,
        issueDate: snapshot.get('purchaseData.issueDate').toDate(),
      },
      payment: {
        ...snapshot.data().payment,
        paymentDate: snapshot.get('payment.paymentDate').toDate(),
      },
    }) as Purchase,
};

const create = async (purchase: Partial<Purchase>) => {};

const update = async (purchase: Partial<Purchase>) => {};

const remove = async (purchase: Partial<Purchase>) => {};

const pay = async (purchase: Partial<Purchase>) => {};

const unpay = async (purchase: Partial<Purchase>) => {};

export const PurchasesFirestore = {
  create,
  update,
  remove,
  pay,
  unpay,
};
