import { collection, doc, getDocs, query, setDoc } from 'firebase/firestore';
import { ImportCalculator } from 'src/@types/importCalculator';
import { COLLECTIONS } from 'src/lib/enums/collections';
import { DB } from 'src/lib/settings/firebase';

const list = async (): Promise<ImportCalculator[]> => {
  const q = query(collection(DB, COLLECTIONS.IMPORT_CALCULATIONS));
  const querySnapshot = await getDocs(q);

  const calculations = [] as ImportCalculator[];
  querySnapshot.forEach((document) => calculations.push(document.data() as ImportCalculator));
  return calculations;
};

const upsert = async (calculation: ImportCalculator): Promise<void> => {
  const { id } = calculation;

  let docRef;

  if (id) {
    docRef = doc(DB, COLLECTIONS.IMPORT_CALCULATIONS, id);
    calculation.metadata.updatedAt = Date.now();
  } else {
    docRef = doc(collection(DB, COLLECTIONS.IMPORT_CALCULATIONS));
    calculation.metadata.createdAt = Date.now();
    calculation.metadata.updatedAt = Date.now();
    calculation.id = docRef.id;
  }

  await setDoc(docRef, calculation);
};

const ImportCalculationsFirebase = {
  list,
  upsert,
};

export default ImportCalculationsFirebase;
