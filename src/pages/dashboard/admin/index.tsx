import { LoadingButton } from '@mui/lab';
import { Stack } from '@mui/material';
import { COLLECTIONS } from '@src/services/firestore/collections';
import { DB } from '@src/settings/firebase';
import { DoubleEntryAccounting } from '@src/types/doubleEntryAccounting';
import { Purchase } from '@src/types/purchases';
import { doc, getDoc, getDocs, query, writeBatch } from 'firebase/firestore';
import { useSnackbar } from 'notistack';
import { useState } from 'react';
import DashboardLayout from 'src/components/shared/layouts/dashboard/DashboardLayout';
import DashboardTemplate from 'src/components/shared/layouts/dashboard/DashboardTemplate';

Page.getLayout = (page: React.ReactElement) => (
  <DashboardLayout>{page}</DashboardLayout>
);

const FixAccountingEntriesDates = () => {
  const { enqueueSnackbar } = useSnackbar();
  const [purchases, setPurchases] = useState<Purchase[]>([]);
  const [purchasesLoading, setPurchasesLoading] = useState(false);
  const [updatingDocs, setUpdatingDocs] = useState(false);

  const downloadPurchases = async () => {
    setPurchasesLoading(true);
    const q = query(COLLECTIONS.PURCHASES);
    const querySnapshot = await getDocs(q);

    const documentsArray = querySnapshot.docs.map((d) => d.data() as Purchase);

    setPurchases(documentsArray);
    enqueueSnackbar(`Se cargaron ${documentsArray.length} compras en memoria`);
    setPurchasesLoading(false);
  };

  const updateDocuments = async () => {
    setUpdatingDocs(true);

    let counter = 0;
    const batch = writeBatch(DB);

    await Promise.all(
      purchases.map(async (purchase) => {
        const { id, issueDate } = purchase.purchaseData;

        const docRef = doc(COLLECTIONS.DOUBLE_ENTRY_ACCOUNTING, id);
        const docSnapshot = await getDoc(docRef);

        if (!docSnapshot.exists()) return;

        const accountingEntry: Partial<DoubleEntryAccounting> = {
          issueDate,
        };

        batch.update(docRef, accountingEntry);
        counter += 1;
      })
    );

    await batch.commit();
    enqueueSnackbar(`Se escribieron ${counter} documentos`);
    setUpdatingDocs(false);
  };

  return (
    <Stack direction="row">
      <LoadingButton onClick={downloadPurchases} loading={purchasesLoading}>
        Cargar Compras
      </LoadingButton>

      <LoadingButton
        onClick={updateDocuments}
        loading={updatingDocs}
        disabled={purchases.length === 0}
      >
        Corregir fechas
      </LoadingButton>
    </Stack>
  );
};

export default function Page() {
  return (
    <DashboardTemplate documentTitle="Admin" heading="Admin Tools">
      <Stack>
        <FixAccountingEntriesDates />
      </Stack>
    </DashboardTemplate>
  );
}
