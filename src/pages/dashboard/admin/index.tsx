import { LoadingButton } from '@mui/lab';
import { Stack, Typography } from '@mui/material';
import { COLLECTIONS_ENUM } from '@src/lib/enums/collections';
import { DB } from '@src/settings/firebase';
import { DayBookTransactionOld } from '@src/types/dayBook';
import { DocumentRef } from '@src/types/documentReference';
import {
  DoubleEntryAccounting,
  DoubleEntryAccountingTransaction,
} from '@src/types/doubleEntryAccounting';
import { CustomsPaymentOld, ExpenseOld, InvoiceOld } from '@src/types/expenses';
import {
  CustomsPayment,
  NonDeductible,
  Purchase,
  ReceivedInvoice,
  SaleNote,
} from '@src/types/purchases';
import {
  collection,
  doc,
  getDocs,
  query,
  writeBatch,
} from 'firebase/firestore';
import { useSnackbar } from 'notistack';
import { FC, useState } from 'react';
import DashboardLayout from 'src/components/shared/layouts/dashboard/DashboardLayout';
import DashboardTemplate from 'src/components/shared/layouts/dashboard/DashboardTemplate';

const BATCH_LIMIT = 500; // Firestore batch write limit

const customPayment2Purchase = (data: CustomsPaymentOld): Purchase => {
  const ref: Record<string, string> = {};

  if (data.project_id) {
    ref.project_id = data.project_id;
  }

  const purchaseData: CustomsPayment = {
    id: data.id || '',
    paid: true,
    description: data.description || '',
    issueDate: data.issue_date,
    IVA: data.IVA,
    FODINFA: data.FODINFA,
    adValoremTariff: data.ad_valorem_tariff,
    specificTariff: data.specific_tariff,
    customsPaymentNumber: data.customs_payment_number,
    total: data.total,
    ref,
  };

  return {
    id: data.id,
    purchaseData,
    type: 'customsPayment',
  };
};

const invoice2Purchase = (data: InvoiceOld): Purchase => {
  const ref: Record<string, string> = {};

  if (data.project_id) {
    ref.projectId = data.project_id;
  }

  const purchaseData: ReceivedInvoice = {
    id: data.id || '',
    paid: true,
    issueDate: data.issue_date,
    description: data.description || '',
    emissionPoint: data.emission_point,
    establishment: data.establishment,
    sequentialNumber: data.sequential_number,
    issuerId: data.issuer_id,
    issuerName: data.issuer_name || '',
    noTaxSubtotal: data.tax_exempted_subtotal || 0,
    taxedSubtotal: data.taxed_subtotal || 0,
    IVA: data.IVA,
    total: data.total,
    ref,
    expenseAccount: '2.1.3.01.001',
  };

  return {
    id: data.id,
    purchaseData,
    type: 'receivedInvoice',
  };
};

const saleNote2Purchase = (data: ExpenseOld): Purchase => {
  const ref: Record<string, string> = {};

  if (data.project_id) {
    ref.project_id = data.project_id;
  }

  const purchaseData: SaleNote = {
    id: data.id || '',
    paid: true,
    description: data.description || '',
    issueDate: data.issue_date,
    total: data.total,
    emissionPoint: 1,
    establishment: 1,
    sequentialNumber: 1,
    issuerId: '9999999999',
    issuerName: data.issuer_name || '',
    ref,
    expenseAccount: '2.1.3.01.001',
  };

  return {
    id: data.id,
    purchaseData,
    type: 'saleNote',
  };
};

const nonDeductible2Purchase = (data: ExpenseOld): Purchase => {
  const ref: Record<string, string> = {};

  if (data.project_id) {
    ref.project_id = data.project_id;
  }

  const purchaseData: NonDeductible = {
    id: data.id || '',
    paid: true,
    description: data.description || '',
    issueDate: data.issue_date,
    issuerName: data.issuer_name || '',
    total: data.total,
    ref,
    expenseAccount: '2.1.3.01.001',
  };

  return {
    id: data.id,
    purchaseData,
    type: 'nonDeductible',
  };
};

const ExportExpenses: FC = () => {
  const { enqueueSnackbar } = useSnackbar();
  const [expenses, setExpenses] = useState<any[]>([]);
  const [purchases, setPurchases] = useState<Purchase[]>([]);
  const [loadingExpenses, setLoadingExpenses] = useState(false);
  const [converting, setConverting] = useState(false);
  const [uploadingExpenses, setUploadingExpenses] = useState(false);

  const loadExpenses = async () => {
    setLoadingExpenses(true);
    const q = query(collection(DB, COLLECTIONS_ENUM.EXPENSES));
    const querySnapshot = await getDocs(q);

    const expensesArray = querySnapshot.docs.map((document) => document.data());
    setExpenses(expensesArray);
    setLoadingExpenses(false);
    enqueueSnackbar(`${expensesArray.length} were loaded into memory`);
  };

  const convertExpense2Purchase = () => {
    setConverting(true);

    const purchasesArray = new Array(expenses.length);

    // TODO: Update the expense account to avoid having a default account when possible
    // TODO: Fix the nonexisting expense default account

    expenses.forEach((expense, index) => {
      if (expense.type === 'non_deductible') {
        purchasesArray[index] = nonDeductible2Purchase(expense);
        return;
      }

      if (expense.type === 'sale_note') {
        purchasesArray[index] = saleNote2Purchase(expense);
        return;
      }

      if (expense.type === 'customs_payment') {
        purchasesArray[index] = customPayment2Purchase(expense);
        return;
      }

      if (expense.type === 'invoice') {
        purchasesArray[index] = invoice2Purchase(expense);
        return;
      }

      console.error('No category match for: ', expense);
      purchasesArray[index] = null;
    });

    const errorsArray = purchasesArray.filter((p) => !p);

    if (errorsArray.length) {
      enqueueSnackbar(`Finished with errors ${errorsArray.length}`);
    } else {
      enqueueSnackbar('Finished with no errors');
    }

    setPurchases(purchasesArray);
    setConverting(false);
  };

  const storePurchases = async () => {
    setUploadingExpenses(true);

    const chunkedPurchases = []; // To store chunks of purchases

    // Chunk the purchases array into groups of 500
    for (let i = 0; i < purchases.length; i += BATCH_LIMIT) {
      chunkedPurchases.push(purchases.slice(i, i + BATCH_LIMIT));
    }

    try {
      // eslint-disable-next-line no-restricted-syntax
      for (const chunk of chunkedPurchases) {
        const batch = writeBatch(DB);

        chunk.forEach((document) => {
          const docRef = doc(DB, COLLECTIONS_ENUM.PURCHASES, document.id ?? '');
          batch.set(docRef, document);
          console.info('Added document with ID: ', docRef.id, ' to batch');
        });

        console.info('Committing batch');
        // eslint-disable-next-line no-await-in-loop
        await batch.commit(); // Commit the current batch
        console.info('Batch committed');
      }

      enqueueSnackbar('Documents upload finished');
    } catch (error) {
      console.error('Error committing batch:', error);
      enqueueSnackbar('Error uploading documents', { variant: 'error' });
    } finally {
      setUploadingExpenses(false);
    }
  };

  return (
    <Stack>
      <Typography variant="h4">Convert Expenses to Purchases</Typography>
      <Stack direction="row" gap={2}>
        <LoadingButton onClick={loadExpenses} loading={loadingExpenses}>
          Load Expenses into memory
        </LoadingButton>
        <LoadingButton
          onClick={convertExpense2Purchase}
          disabled={expenses.length === 0}
          loading={converting}
        >
          Convert Expenses into Purchases
        </LoadingButton>
        <LoadingButton
          onClick={storePurchases}
          disabled={purchases.length === 0}
          loading={uploadingExpenses}
        >
          Store Purchases
        </LoadingButton>
      </Stack>
    </Stack>
  );
};

const getRefMapper = (oldData: DayBookTransactionOld[]) => {
  const existingProjects: Record<string, string> = {
    885: 'nOPC8LoXorcemFVO8ZcZ',
    809: 'gsrd25reZ4ziIQYSLelz',
    877: 'fUeg7iVoS62Z9I2tfw5W',
    673: 'Q7rkr4Cen5aJieFf3Brk',
    896: 'NJqGL2fDDKW28QCzvMHN',
    829: 'M68lnROy56aCUgiog214',
  };

  const refMap: Record<string, DocumentRef> = {};

  oldData.forEach((data) =>
    data.transactions.forEach(async (details) => {
      if (!data.id) return;

      if (details.project_id) {
        refMap[String(data.id)] = {
          ...(refMap[String(data.id)] ?? {}),
          projectId: details.project_id!,
        };
      }

      if (details.expense_id) {
        refMap[String(data.id)] = {
          ...(refMap[String(data.id)] ?? {}),
          purchaseId: details.expense_id!,
        };
      }

      const quotation_id = String(details.quotation_id);

      if (
        quotation_id &&
        Object.keys(existingProjects).includes(quotation_id)
      ) {
        refMap[String(data.id)] = {
          ...(refMap[String(data.id)] ?? {}),
          projectId: existingProjects[quotation_id] as string,
        };
      }
    })
  );

  return refMap;
};

const DayBookTransaction2DoubleEntryAccounting = (
  data: DayBookTransactionOld,
  refMap: Record<string, DocumentRef>
): DoubleEntryAccounting => {
  const transactions: DoubleEntryAccountingTransaction[] =
    data.transactions.map((transaction) => ({
      accountId: transaction.account_id,
      credit: transaction.credit || 0,
      debit: transaction.debit || 0,
    }));

  const getDocId = (oldId: string): string => {
    const refObject = refMap[oldId];

    if (!refObject) {
      return oldId;
    }

    const hasNonProjectId = Object.keys(refObject).filter(
      (k) => k !== 'projectId'
    );

    if (hasNonProjectId.length) {
      // @ts-expect-error - There is an existing id
      return refMap[oldId][hasNonProjectId[0]] as string;
    }

    return oldId;
  };

  return {
    id: getDocId(data.id ?? ''),
    description: data.transactions[0]?.description ?? '',
    ref: refMap[data.id ?? ''] || {},
    transactions,
    accounts: transactions.map((t) => t.accountId),
    locked: data.locked || false,
    createdAt: data.createdAt || new Date(),
    updatedAt: data.updatedAt || new Date(),
    issueDate: data.createdAt || new Date(),
  };
};

const ExportDoubleEntryAccounting: FC = () => {
  const { enqueueSnackbar } = useSnackbar();
  const [loadingOldData, setLoadingOldData] = useState(false);
  const [converting, setConverting] = useState(false);
  const [uploadingData, setUploadingData] = useState(false);
  const [oldRecords, setOldRecords] = useState<DayBookTransactionOld[]>([]);
  const [newEntries, setNewEntries] = useState<DoubleEntryAccounting[]>([]);

  const fetchOldRecords = async () => {
    setLoadingOldData(true);
    const q = query(collection(DB, COLLECTIONS_ENUM.DAY_BOOK_TRANSACTIONS));

    const querySnapshot = await getDocs(q);

    const oldDataArray = querySnapshot.docs.map(
      (d) => d.data() as DayBookTransactionOld
    );
    setOldRecords(oldDataArray);
    setLoadingOldData(false);
    enqueueSnackbar(`${oldDataArray.length} were loaded into memory`);
  };

  const convertEntries = () => {
    setConverting(true);

    const refMap = getRefMapper(oldRecords);

    try {
      const newRecords = oldRecords.map((r) =>
        DayBookTransaction2DoubleEntryAccounting(r, refMap)
      );

      setNewEntries(newRecords);
      enqueueSnackbar('Finished entries convertion');
    } catch (e) {
      enqueueSnackbar(`Something went wrong`);
      console.error(e);
    } finally {
      setConverting(false);
    }
  };

  const storeNewEntries = async () => {
    setUploadingData(true);

    const chunkedEntries = [];

    for (let i = 0; i < newEntries.length; i += BATCH_LIMIT) {
      chunkedEntries.push(newEntries.slice(i, i + BATCH_LIMIT));
    }

    try {
      // eslint-disable-next-line no-restricted-syntax
      for (const chunk of chunkedEntries) {
        const batch = writeBatch(DB);

        chunk.forEach((document) => {
          const docRef = doc(
            DB,
            COLLECTIONS_ENUM.DOUBLE_ENTRY_ACCOUNTING,
            document.id ?? ''
          );
          batch.set(docRef, document);
          console.info('Added document with ID: ', docRef.id, ' to batch');
        });

        console.info('Committing batch');
        // eslint-disable-next-line no-await-in-loop
        await batch.commit(); // Commit the current batch
        console.info('Batch committed');
      }

      enqueueSnackbar('Documents upload finished');
    } catch (error) {
      console.error('Error committing batch:', error);
      enqueueSnackbar('Error uploading documents', { variant: 'error' });
    } finally {
      setUploadingData(false);
    }
  };
  return (
    <Stack>
      <Typography variant="h4">Convert daybook transactions</Typography>
      <Stack direction="row" gap={2}>
        <LoadingButton onClick={fetchOldRecords} loading={loadingOldData}>
          Load old transactions into Memory
        </LoadingButton>

        <LoadingButton
          onClick={convertEntries}
          loading={converting}
          disabled={oldRecords.length === 0}
        >
          Convert into new format
        </LoadingButton>

        <LoadingButton
          onClick={storeNewEntries}
          loading={uploadingData}
          disabled={newEntries.length === 0}
        >
          Storing new format
        </LoadingButton>
      </Stack>
    </Stack>
  );
};

Page.getLayout = (page: React.ReactElement) => (
  <DashboardLayout>{page}</DashboardLayout>
);

export default function Page() {
  return (
    <DashboardTemplate documentTitle="Admin" heading="Admin Tools">
      <Stack>
        <ExportDoubleEntryAccounting />
        <ExportExpenses />
      </Stack>
    </DashboardTemplate>
  );
}
