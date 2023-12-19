import { initializeApp } from 'firebase/app';
import { collection, getDocs, getFirestore, query } from 'firebase/firestore';
import { useCallback, useEffect, useState } from 'react';
import { FIREBASE_API } from 'src/config-global';
import DashboardLayout from 'src/layouts/dashboard/DashboardLayout';

const Page = () => {
  const [calculations, setCalculations] = useState<any[]>([]);
  const firebaseApp = initializeApp(FIREBASE_API);
  const DB = getFirestore(firebaseApp);

  const getCalculations = useCallback(async () => {
    const q = query(collection(DB, 'importCalculations'));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      setCalculations((prev) => [...prev, doc.data()]);
    });
  }, [DB]);

  useEffect(() => {
    getCalculations();
  }, [getCalculations]);

  return (
    <DashboardLayout>
      <div>
        <pre>{JSON.stringify(calculations, null, 2)}</pre>
      </div>
    </DashboardLayout>
  );
};

export default Page;
