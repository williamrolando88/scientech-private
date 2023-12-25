import { collection, getDocs, query } from 'firebase/firestore';
import { ImportCalculator } from 'src/@types/calculator';
import { DB } from '../lib/settings/firebase';

const list = async (): Promise<ImportCalculator[]> => {
  const q = query(collection(DB, 'importCalculations'));
  const querySnapshot = await getDocs(q);

  const calculations = [] as ImportCalculator[];
  querySnapshot.forEach((doc) => calculations.push(doc.data() as ImportCalculator));
  return calculations;
};

const ImportCalculationsFirebase = {
  list,
};

export default ImportCalculationsFirebase;
