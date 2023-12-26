import { collection, doc, getDocs, orderBy, query, setDoc } from 'firebase/firestore';
import { ImportCalculator } from 'src/@types/importCalculator';
import { COLLECTIONS } from 'src/lib/enums/collections';
import { DB } from 'src/lib/settings/firebase';

const list = async (): Promise<ImportCalculator[]> => {
  const q = query(
    collection(DB, COLLECTIONS.IMPORT_CALCULATIONS),
    orderBy('metadata.updatedAt', 'desc')
  );
  const querySnapshot = await getDocs(q);

  const calculations = [] as ImportCalculator[];
  querySnapshot.forEach((document) => calculations.push(document.data() as ImportCalculator));
  return calculations;
};

const upsert = async (calculation: ImportCalculator): Promise<string> => {
  const date = Date.now();
  const { id } = calculation;
  let docRef;

  if (id) {
    docRef = doc(DB, COLLECTIONS.IMPORT_CALCULATIONS, id);
    calculation.metadata.updatedAt = date;
  } else {
    docRef = doc(collection(DB, COLLECTIONS.IMPORT_CALCULATIONS));
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
};

export default ImportCalculationsFirebase;
