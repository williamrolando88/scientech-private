import { Button, Stack } from '@mui/material';
import { useListDayBookTransactions } from '@src/hooks/cache/dayBook';
import { useListExpensesByType } from '@src/hooks/cache/expenses';
import { COLLECTIONS } from '@src/lib/enums/collections';
import { GeneralExpenseConverter } from '@src/services/firebase/expenses/converters';
import { DB } from '@src/settings/firebase';
import { DayBookTransactionOld } from '@src/types/dayBook';
import { DoubleEntryAccounting } from '@src/types/doubleEntryAccounting';
import { CustomsPaymentOld, ExpenseOld, InvoiceOld } from '@src/types/expenses';
import {
  CustomsPayment,
  NonDeductible,
  ReceivedInvoice,
  SaleNote,
} from '@src/types/purchases';
import { doc, getDoc, writeBatch } from 'firebase/firestore';
import { camelCase } from 'lodash';
import { FC, useEffect, useState } from 'react';
import DashboardLayout from 'src/components/shared/layouts/dashboard/DashboardLayout';
import DashboardTemplate from 'src/components/shared/layouts/dashboard/DashboardTemplate';

const ExportCustomsPaymentsNewFormat: FC = () => {
  const { data: oldData, isLoading } =
    useListExpensesByType<CustomsPaymentOld>('customs_payment');

  const converter = (data: CustomsPaymentOld): CustomsPayment => {
    const ref: Record<string, string> = {};

    if (data.project_id) {
      ref.project_id = data.project_id;
    }

    return {
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
  };

  const execute = async () => {
    if (oldData.length === 0) {
      alert('Cargando datos...');
      return;
    }

    console.log('Started batch creation');
    const batch = writeBatch(DB);

    oldData.forEach((document) => {
      const docRef = doc(DB, COLLECTIONS.CUSTOMS_PAYMENTS, document.id ?? '');

      const convertedData = converter(document);
      batch.set(docRef, convertedData);
      console.log('Added document with ID: ', docRef.id, ' to batch');
    });

    console.log('Committing batch');
    await batch.commit();
    console.log('Batch committed');
  };

  if (isLoading) {
    return <p>Cargando liquidaciones...</p>;
  }

  return (
    <Button onClick={execute} disabled={isLoading || !oldData.length}>
      {!oldData.length
        ? 'No hay datos'
        : 'Exportar Liquidaciones en Nuevo Formato'}
    </Button>
  );
};

const ExportInvoicesNewFormat: FC = () => {
  const { data: oldData, isLoading } =
    useListExpensesByType<InvoiceOld>('invoice');

  const converter = (data: InvoiceOld): ReceivedInvoice => {
    const ref: Record<string, string> = {};

    if (data.project_id) {
      ref.project_id = data.project_id;
    }

    return {
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
    };
  };

  const execute = async () => {
    if (oldData.length === 0) {
      alert('Cargando datos...');
      return;
    }

    console.log('Started batch creation');
    const batch = writeBatch(DB);

    oldData.forEach((document) => {
      const docRef = doc(DB, COLLECTIONS.INVOICES, document.id ?? '');

      const convertedData = converter(document);
      batch.set(docRef, convertedData);
      console.log('Added document with ID: ', docRef.id, ' to batch');
    });

    console.log('Committing batch');
    await batch.commit();
    console.log('Batch committed');
  };

  if (isLoading) {
    return <p>Cargando facturas...</p>;
  }

  return (
    <Button onClick={execute} disabled={isLoading || !oldData.length}>
      {!oldData.length ? 'No hay datos' : 'Exportar facturas en Nuevo Formato'}
    </Button>
  );
};

const ExportSaleNotesNewFormat: FC = () => {
  const { data: oldData, isLoading } =
    useListExpensesByType<ExpenseOld>('sale_note');

  const converter = (data: ExpenseOld): SaleNote => {
    const ref: Record<string, string> = {};

    if (data.project_id) {
      ref.project_id = data.project_id;
    }

    return {
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
    };
  };

  const execute = async () => {
    if (oldData.length === 0) {
      alert('Cargando datos...');
      return;
    }

    console.log('Started batch creation');
    const batch = writeBatch(DB);

    oldData.forEach((document) => {
      const docRef = doc(DB, COLLECTIONS.SALE_NOTES, document.id ?? '');

      const convertedData = converter(document);
      batch.set(docRef, convertedData);
      console.log('Added document with ID: ', docRef.id, ' to batch');
    });

    console.log('Committing batch');
    await batch.commit();
    console.log('Batch committed');
  };

  if (isLoading) {
    return <p>Cargando notas de venta...</p>;
  }

  return (
    <Button onClick={execute} disabled={isLoading || !oldData.length}>
      {!oldData.length
        ? 'No hay datos'
        : 'Exportar notas de venta en Nuevo Formato'}
    </Button>
  );
};

const ExportNonDeductiblesNewFormat: FC = () => {
  const { data: oldData, isLoading } =
    useListExpensesByType<ExpenseOld>('non_deductible');

  const converter = (data: ExpenseOld): NonDeductible => {
    const ref: Record<string, string> = {};

    if (data.project_id) {
      ref.project_id = data.project_id;
    }

    return {
      id: data.id || '',
      paid: true,
      description: data.description || '',
      issueDate: data.issue_date,
      issuerName: data.issuer_name || '',
      total: data.total,
      ref,
    };
  };

  const execute = async () => {
    if (oldData.length === 0) {
      alert('Cargando datos...');
      return;
    }

    console.log('Started batch creation');
    const batch = writeBatch(DB);

    oldData.forEach((document) => {
      const docRef = doc(DB, COLLECTIONS.NON_DEDUCTIBLEs, document.id ?? '');

      const convertedData = converter(document);
      batch.set(docRef, convertedData);
      console.log('Added document with ID: ', docRef.id, ' to batch');
    });

    console.log('Committing batch');
    await batch.commit();
    console.log('Batch committed');
  };

  if (isLoading) {
    return <p>Cargando no deducibles...</p>;
  }

  return (
    <Button onClick={execute} disabled={isLoading || !oldData.length}>
      {!oldData.length
        ? 'No hay datos'
        : 'Exportar no deducibles en Nuevo Formato'}
    </Button>
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

  const getExpenseKeyType = async (id: string) => {
    const docRef = doc(DB, COLLECTIONS.EXPENSES, id).withConverter(
      GeneralExpenseConverter
    );

    const docData = (await getDoc(docRef)).data();

    const type = docData?.type;
    return `${camelCase(type)}Id`;
  };

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
                  const expenseKey = await getExpenseKeyType(
                    details.expense_id
                  );

                  setLinkedTransactions((prev) => ({
                    ...prev,
                    [String(transaction.id)]: {
                      ...(prev[String(transaction.id)] ?? {}),
                      [expenseKey]: details.expense_id!,
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

  const converter = (
    oldData: DayBookTransactionOld
  ): DoubleEntryAccounting => ({
    id: oldData.id || '',
    issueDate: oldData.createdAt || new Date(),
    description: oldData.transactions[0].description || '',
    ref: linkedTransactions[oldData.id!] || {},
    transactions: oldData.transactions.map((transaction) => ({
      accountId: transaction.account_id,
      credit: transaction.credit || 0,
      debit: transaction.debit || 0,
    })),
    locked: oldData.locked || false,
    createdAt: oldData.createdAt || new Date(),
    updatedAt: oldData.updatedAt || new Date(),
  });

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
        COLLECTIONS.DOUBLE_ENTRY_ACCOUNTING,
        document.id ?? ''
      );

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
        <ExportCustomsPaymentsNewFormat />
        <ExportNonDeductiblesNewFormat />
        <ExportSaleNotesNewFormat />
        <ExportInvoicesNewFormat />
        <ExportDayBookNewFormat />
      </Stack>
    </DashboardTemplate>
  );
}
