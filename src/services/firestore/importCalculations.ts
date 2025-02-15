import {
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
  setDoc,
} from 'firebase/firestore';
import { ImportCalculator } from 'src/types/importCalculator';
import { COLLECTIONS } from './collections';

const list = async (): Promise<ImportCalculator[]> => {
  const q = query(
    COLLECTIONS.IMPORT_CALCULATIONS,
    orderBy('metadata.updatedAt', 'desc')
  );
  const querySnapshot = await getDocs(q);

  return querySnapshot.docs.map(
    (document) => document.data() as ImportCalculator
  );
};

const open = async (id: string): Promise<ImportCalculator> => {
  const docRef = doc(COLLECTIONS.IMPORT_CALCULATIONS, id);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return docSnap.data() as ImportCalculator;
  }
  throw new Error('El calculo especificado no existe!');
};

const upsert = async (calculation: ImportCalculator): Promise<string> => {
  const date = Date.now();
  const { id } = calculation;
  let docRef;

  if (id) {
    docRef = doc(COLLECTIONS.IMPORT_CALCULATIONS, id);
    calculation.metadata.updatedAt = date;
  } else {
    docRef = doc(COLLECTIONS.IMPORT_CALCULATIONS);
    calculation.metadata.createdAt = date;
    calculation.metadata.updatedAt = date;
    calculation.id = docRef.id;
  }

  await setDoc(docRef, calculation);

  return docRef.id;
};

const ImportCalculationsFirebase = {
  list,
  upsert,
  open,
};

export default ImportCalculationsFirebase;
