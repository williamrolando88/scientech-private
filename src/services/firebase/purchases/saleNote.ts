import { COLLECTIONS } from '@src/lib/enums/collections';
import { DB } from '@src/settings/firebase';
import { SaleNote } from '@src/types/purchases';
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

export const saleNoteConverter: FirestoreDataConverter<SaleNote> = {
  toFirestore: (invoice: SaleNote) => invoice,
  fromFirestore: (snapshot: any) => ({
    ...snapshot.data(),
    issueDate: snapshot.data().issueDate.toDate(),
  }),
};

const checkDuplicated = async (saleNote: SaleNote) => {
  if (saleNote.id) return;

  const docCollection = collection(DB, COLLECTIONS.SALE_NOTES);

  const queries = [
    where('issuerId', '==', saleNote.issuerId),
    where('issueDate', '==', saleNote.issueDate),
  ];

  if (saleNote.sequentialNumber)
    queries.push(where('sequentialNumber', '==', saleNote.sequentialNumber));
  if (saleNote.emissionPoint)
    queries.push(where('emissionPoint', '==', saleNote.emissionPoint));
  if (saleNote.establishment)
    queries.push(where('establishment', '==', saleNote.establishment));

  const querySnapshot = query(docCollection, ...queries);

  if (!(await getDocs(querySnapshot)).empty) {
    throw new Error('Nota de Venta duplicada');
  }
};

const upsert = async (saleNote: SaleNote): Promise<string> => {
  await checkDuplicated(saleNote);

  const docCollection = collection(DB, COLLECTIONS.SALE_NOTES);

  let docRef;
  if (saleNote.id) {
    docRef = doc(docCollection, saleNote.id).withConverter(saleNoteConverter);
  } else {
    docRef = doc(docCollection).withConverter(saleNoteConverter);
    saleNote.id = docRef.id;
  }

  await setDoc(docRef, saleNote);
  return docRef.id;
};

const remove = async (id: string) => {
  const docRef = doc(DB, COLLECTIONS.SALE_NOTES, id);
  await deleteDoc(docRef);
};
export const FirestoreSaleNote = {
  upsert,
  remove,
};
