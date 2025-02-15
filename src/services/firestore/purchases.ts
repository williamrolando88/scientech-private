import { Purchase } from '@src/types/purchases';
import { deleteDoc, doc, setDoc } from 'firebase/firestore';
import { COLLECTIONS } from './collections';

const create = async (purchase: Partial<Purchase>) => {
  const docRef = doc(COLLECTIONS.PURCHASES);

  const purchaseDoc: Purchase = {
    ...purchase,
    id: docRef.id,
    // @ts-expect-error - This is a generic field
    purchaseData: { ...purchase.purchaseData, id: docRef.id },
  };

  await setDoc(docRef, purchaseDoc);
  return docRef.id;
};

const update = async (purchase: Partial<Purchase>) => {
  const docRef = doc(COLLECTIONS.PURCHASES, purchase.id!);
  await setDoc(docRef, purchase, { merge: true });
  return docRef.id;
};

const remove = async (purchase: Partial<Purchase>) => {
  const docRef = doc(COLLECTIONS.PURCHASES, purchase.id!);
  await deleteDoc(docRef);
};

const pay = async (purchase: Partial<Purchase>) => {
  const docRef = doc(COLLECTIONS.PURCHASES, purchase.id);

  const paymentDoc: Partial<Purchase> = {
    // @ts-expect-error - Only modifies one property for the document
    purchaseData: { paid: true },
    payment: purchase.payment,
  };

  await setDoc(docRef, paymentDoc, { merge: true });
};

const unpay = async (purchase: Partial<Purchase>) => {
  const docRef = doc(COLLECTIONS.PURCHASES, purchase.id);

  const paymentDoc: Partial<Purchase> = {
    // @ts-expect-error - Only modifies one property for the document
    purchaseData: { paid: false },
    payment: null,
  };

  await setDoc(docRef, paymentDoc, { merge: true });
};

export const PurchasesFirestore = {
  create,
  update,
  remove,
  pay,
  unpay,
};
