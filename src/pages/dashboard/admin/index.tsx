import { LoadingButton } from '@mui/lab';
import { Button, Stack } from '@mui/material';
import { useListDayBookTransactions } from '@src/hooks/cache/dayBook';
import { COLLECTIONS_ENUM } from '@src/lib/enums/collections';
import { DB } from '@src/settings/firebase';
import { DayBookTransactionOld } from '@src/types/dayBook';
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
import { FC, useEffect, useState } from 'react';
import DashboardLayout from 'src/components/shared/layouts/dashboard/DashboardLayout';
import DashboardTemplate from 'src/components/shared/layouts/dashboard/DashboardTemplate';

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
    enqueueSnackbar('Starting converting expenses to purchases');
    setConverting(true);

    const purchasesArray = new Array(expenses.length);

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

    if (errorsArray) {
      enqueueSnackbar(`Finished with errors ${errorsArray.length}`);
    } else {
      enqueueSnackbar('Finished with no errors');
    }

    setPurchases(purchasesArray);
    setConverting(false);
  };

  const storePurchases = async () => {
    setUploadingExpenses(true);
    enqueueSnackbar('Documents upload started');
    const batch = writeBatch(DB);

    purchases.forEach((document) => {
      const docRef = doc(DB, COLLECTIONS_ENUM.PURCHASES, document.id ?? '');

      batch.set(docRef, document);
      console.info('Added document with ID: ', docRef.id, ' to batch');
    });

    console.info('Committing batch');
    await batch.commit();
    console.info('Batch committed');

    enqueueSnackbar('Documents upload finished');
    setUploadingExpenses(false);
  };

  return (
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
  );
};

const existingProjects: Record<string, string> = {
  885: 'nOPC8LoXorcemFVO8ZcZ',
  809: 'gsrd25reZ4ziIQYSLelz',
  877: 'fUeg7iVoS62Z9I2tfw5W',
  673: 'Q7rkr4Cen5aJieFf3Brk',
  896: 'NJqGL2fDDKW28QCzvMHN',
  829: 'M68lnROy56aCUgiog214',
};

const ExportDayBookNewFormat: FC = () => {
  const { data, isLoading } = useListDayBookTransactions();
  const [linkedTransactions, setLinkedTransactions] = useState<
    Record<string, Record<string, string>>
  >({});

  useEffect(() => {
    if (data.length) {
      Promise.all(
        data.map(async (transaction) => {
          Promise.all(
            transaction.transactions.map(async (details) => {
              if (transaction.id) {
                if (details.project_id) {
                  setLinkedTransactions((prev) => ({
                    ...prev,
                    [String(transaction.id)]: {
                      ...(prev[String(transaction.id)] ?? {}),
                      projectId: details.project_id!,
                    },
                  }));
                }

                if (details.expense_id) {
                  setLinkedTransactions((prev) => ({
                    ...prev,
                    [String(transaction.id)]: {
                      ...(prev[String(transaction.id)] ?? {}),
                      purchaseId: details.expense_id!,
                    },
                  }));
                }

                const quotation_id = String(details.quotation_id);

                if (
                  quotation_id &&
                  Object.keys(existingProjects).includes(quotation_id)
                ) {
                  setLinkedTransactions((prev) => ({
                    ...prev,
                    [String(transaction.id)]: {
                      ...(prev[String(transaction.id)] ?? {}),
                      projectId: existingProjects[quotation_id] as string,
                    },
                  }));
                }
              }
            })
          );
        })
      );
    }
  }, [data]);

  const converter = (oldData: DayBookTransactionOld): DoubleEntryAccounting => {
    const transactions: DoubleEntryAccountingTransaction[] =
      oldData.transactions.map((transaction) => ({
        accountId: transaction.account_id,
        credit: transaction.credit || 0,
        debit: transaction.debit || 0,
      }));

    const getDocId = (oldId: string): string => {
      const refObject = linkedTransactions[oldId];

      if (!refObject) {
        return oldId;
      }

      const hasNonProjectId = Object.keys(refObject).filter(
        (k) => k !== 'projectId'
      );

      if (hasNonProjectId.length) {
        return linkedTransactions[oldId][hasNonProjectId[0]];
      }

      return oldId;
    };

    return {
      id: getDocId(oldData.id!),
      issueDate: oldData.createdAt || new Date(),
      description: oldData.transactions[0].description || '',
      ref: linkedTransactions[oldData.id!] || {},
      transactions,
      accounts: oldData.transactions.map((t) => t.account_id),
      locked: oldData.locked || false,
      createdAt: oldData.createdAt || new Date(),
      updatedAt: oldData.updatedAt || new Date(),
    };
  };

  const execute = async () => {
    if (Object.keys(linkedTransactions).length === 0) {
      alert('Cargando datos...');
      return;
    }

    console.log('Started batch creation');
    const batch = writeBatch(DB);

    data.forEach((document) => {
      const docRef = doc(
        DB,
        COLLECTIONS_ENUM.DOUBLE_ENTRY_ACCOUNTING,
        document.id ?? ''
      );

      const isValid = document.transactions.every(
        (transaction) => transaction.account_id
      );

      if (!isValid) {
        console.error('Invalid transaction data', document);

        return;
      }

      const convertedData = converter(document);
      batch.set(docRef, convertedData);
      console.log('Added document with ID: ', docRef.id, ' to batch');
    });

    console.log('Committing batch');
    await batch.commit();
    console.log('Batch committed');
  };

  if (isLoading) {
    return <p>Cargando datos...</p>;
  }

  return (
    <Button
      onClick={execute}
      disabled={isLoading || !Object.keys(linkedTransactions).length}
    >
      {!Object.keys(linkedTransactions).length
        ? 'No hay datos'
        : 'Exportar libro diario en Nuevo Formato'}
    </Button>
  );
};

Page.getLayout = (page: React.ReactElement) => (
  <DashboardLayout>{page}</DashboardLayout>
);

export default function Page() {
  return (
    <DashboardTemplate documentTitle="Admin" heading="Admin Tools">
      <Stack>
        <ExportExpenses />
        <ExportDayBookNewFormat />
      </Stack>
    </DashboardTemplate>
  );
}
