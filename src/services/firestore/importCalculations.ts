import {
  collection,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
  setDoc,
} from 'firebase/firestore';
import { COLLECTIONS_ENUM } from 'src/lib/enums/collections';
import { DB } from 'src/settings/firebase';
import { ImportCalculator } from 'src/types/importCalculator';

const list = async (): Promise<ImportCalculator[]> => {
  const q = query(
    collection(DB, COLLECTIONS_ENUM.IMPORT_CALCULATIONS),
    orderBy('metadata.updatedAt', 'desc')
  );
  const querySnapshot = await getDocs(q);

  const calculations = [] as ImportCalculator[];
  querySnapshot.forEach((document) =>
    calculations.push(document.data() as ImportCalculator)
  );
  return calculations;
};

const open = async (id: string): Promise<ImportCalculator> => {
  const docRef = doc(DB, COLLECTIONS_ENUM.IMPORT_CALCULATIONS, id);
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
    docRef = doc(DB, COLLECTIONS_ENUM.IMPORT_CALCULATIONS, id);
    calculation.metadata.updatedAt = date;
  } else {
    docRef = doc(collection(DB, COLLECTIONS_ENUM.IMPORT_CALCULATIONS));
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
