import { DialogTitle } from '@mui/material';
import { INVOICE_INITIAL_VALUE } from '@src/lib/constants/expenses';
import { AddReceivedInvoiceProps, Invoice } from '@src/types/expenses';
import { FormikConfig } from 'formik';
import { FC } from 'react';
import BaseInvoiceForm from './BaseInvoiceForm';

const AddInvoice: FC<AddReceivedInvoiceProps> = ({ onClose }) => {
  const handleSubmit: FormikConfig<Invoice>['onSubmit'] = () => {};

  return (
    <>
      <DialogTitle>Agregar nueva factura recibida</DialogTitle>

      <BaseInvoiceForm
        onClose={onClose}
        initialValues={INVOICE_INITIAL_VALUE}
        onSubmit={handleSubmit}
      />
    </>
  );
};

export default AddInvoice;
