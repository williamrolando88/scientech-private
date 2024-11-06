import { COLLECTIONS } from '@src/lib/enums/collections';
import { DB } from '@src/settings/firebase';
import { CustomsPayment } from '@src/types/purchases';
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

export const customsPaymentsConverter: FirestoreDataConverter<CustomsPayment> =
  {
    toFirestore: (customsPayment: CustomsPayment) => customsPayment,
    fromFirestore: (snapshot: any) => ({
      ...snapshot.data(),
      issueDate: snapshot.data().issueDate.toDate(),
    }),
  };

export const checkDuplicated = async (customsPayment: CustomsPayment) => {
  if (customsPayment.id) return;

  const docCollection = collection(DB, COLLECTIONS.CUSTOMS_PAYMENTS);
  const querySnapshot = query(
    docCollection,
    where('customsPaymentNumber', '==', customsPayment.customsPaymentNumber)
  );

  if (!(await getDocs(querySnapshot)).empty) {
    throw new Error('Liquidación aduanera duplicada');
  }
};

const upsert = async (customsPayment: CustomsPayment): Promise<string> => {
  await checkDuplicated(customsPayment);

  const docCollection = collection(DB, COLLECTIONS.CUSTOMS_PAYMENTS);

  let docRef;
  if (customsPayment.id) {
    docRef = doc(docCollection, customsPayment.id).withConverter(
      customsPaymentsConverter
    );
  } else {
    docRef = doc(docCollection).withConverter(customsPaymentsConverter);
    customsPayment.id = docRef.id;
  }

  await setDoc(docRef, customsPayment);
  return docRef.id;
};

const remove = async (id: string) => {
  const docRef = doc(DB, COLLECTIONS.CUSTOMS_PAYMENTS, id);
  await deleteDoc(docRef);
};

export const FirestoreCustomsPayment = {
  upsert,
  remove,
};
