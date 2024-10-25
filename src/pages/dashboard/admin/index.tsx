import { Button, Stack } from '@mui/material';
import { useListExpensesByType } from '@src/hooks/cache/expenses';
import { COLLECTIONS } from '@src/lib/enums/collections';
import { DB } from '@src/settings/firebase';
import { CustomsPaymentOld, ExpenseOld, InvoiceOld } from '@src/types/expenses';
import {
  CustomsPayment,
  Invoice,
  NonDeductible,
  SaleNote,
} from '@src/types/purchases';
import { doc, writeBatch } from 'firebase/firestore';
import { FC } from 'react';
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
    <>
      <Button onClick={execute} disabled={isLoading || !oldData.length}>
        {!oldData.length
          ? 'No hay datos'
          : 'Exportar Liquidaciones en Nuevo Formato'}
      </Button>

      <Stack direction="row" gap={1} flexWrap="wrap">
        {oldData.map((data) => (
          <div>{data.id}</div>
        ))}
      </Stack>
    </>
  );
};

const ExportInvoicesNewFormat: FC = () => {
  const { data: oldData, isLoading } =
    useListExpensesByType<InvoiceOld>('invoice');

  const converter = (data: InvoiceOld): Invoice => {
    const ref: Record<string, string> = {};

    if (data.project_id) {
      ref.project_id = data.project_id;
    }

    return {
      id: data.id || '',
      description: data.description || '',
      issueDate: data.issue_date,
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
    <>
      <Button onClick={execute} disabled={isLoading || !oldData.length}>
        {!oldData.length
          ? 'No hay datos'
          : 'Exportar facturas en Nuevo Formato'}
      </Button>

      <Stack direction="row" gap={1} flexWrap="wrap">
        {oldData.map((data) => (
          <div>{data.id}</div>
        ))}
      </Stack>
    </>
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
    <>
      <Button onClick={execute} disabled={isLoading || !oldData.length}>
        {!oldData.length
          ? 'No hay datos'
          : 'Exportar notas de venta en Nuevo Formato'}
      </Button>

      <Stack direction="row" gap={1} flexWrap="wrap">
        {oldData.map((data) => (
          <div>{data.id}</div>
        ))}
      </Stack>
    </>
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
    <>
      <Button onClick={execute} disabled={isLoading || !oldData.length}>
        {!oldData.length
          ? 'No hay datos'
          : 'Exportar no deducibles en Nuevo Formato'}
      </Button>

      <Stack direction="row" gap={1} flexWrap="wrap">
        {oldData.map((data) => (
          <div>{data.id}</div>
        ))}
      </Stack>
    </>
  );
};

Page.getLayout = (page: React.ReactElement) => (
  <DashboardLayout>{page}</DashboardLayout>
);

export default function Page() {
  return (
    <DashboardTemplate documentTitle="Admin" heading="Admin Tools">
      <ExportCustomsPaymentsNewFormat />
      <ExportNonDeductiblesNewFormat />
      <ExportSaleNotesNewFormat />
      <ExportInvoicesNewFormat />
    </DashboardTemplate>
  );
}