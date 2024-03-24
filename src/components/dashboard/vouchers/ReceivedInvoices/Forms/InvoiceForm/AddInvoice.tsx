import { DialogTitle } from '@mui/material';
import { INVOICE_INITIAL_VALUE } from '@src/lib/constants/expenses';
import { AddReceivedInvoiceProps, ExtendedInvoice } from '@src/types/expenses';
import { FormikConfig } from 'formik';
import { FC } from 'react';
import BaseInvoiceForm from './BaseInvoiceForm';

const AddInvoice: FC<AddReceivedInvoiceProps> = ({ onClose }) => {
  const handleSubmit: FormikConfig<ExtendedInvoice>['onSubmit'] = (
    values,
    { setSubmitting }
  ) => {
    console.log(values);

    setSubmitting(false);
  };

  return (
    <>
      <DialogTitle>Agregar Nueva Factura</DialogTitle>

      <BaseInvoiceForm
        onClose={onClose}
        initialValues={INVOICE_INITIAL_VALUE}
        onSubmit={handleSubmit}
      />
    </>
  );
};

export default AddInvoice;
