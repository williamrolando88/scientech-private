import { DialogTitle } from '@mui/material';
import { useAddExpenseByType } from '@src/hooks/cache/expenses';
import { INVOICE_INITIAL_VALUE } from '@src/lib/constants/expenses';
import { AddReceivedInvoiceProps, ExtendedInvoice } from '@src/types/expenses';
import { FormikConfig } from 'formik';
import { useSnackbar } from 'notistack';
import { FC } from 'react';
import BaseInvoiceForm from './BaseInvoiceForm';

const AddInvoice: FC<AddReceivedInvoiceProps> = ({ onClose }) => {
  const { enqueueSnackbar } = useSnackbar();
  const { mutateAsync: addExpense } = useAddExpenseByType('invoice');

  const handleSubmit: FormikConfig<ExtendedInvoice>['onSubmit'] = (
    values,
    { setSubmitting, resetForm }
  ) => {
    addExpense(values)
      .then(() => {
        resetForm();
        enqueueSnackbar('Factura guardada exitosamente');
        onClose();
      })
      .catch((error) => {
        console.error(error);
        enqueueSnackbar('Error al guardar la factura', { variant: 'error' });
      })
      .finally(() => {
        setSubmitting(false);
      });
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
