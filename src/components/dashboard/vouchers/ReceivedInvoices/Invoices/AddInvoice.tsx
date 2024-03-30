import { DialogTitle } from '@mui/material';
import { useAddExpenseByType } from '@src/hooks/cache/expenses';
import { EXTENDED_INVOICE_INITIAL_VALUE } from '@src/lib/constants/expenses';
import {
  AddReceivedVoucherModalProps,
  ExtendedInvoice,
} from '@src/types/expenses';
import { FormikConfig } from 'formik';
import { useSnackbar } from 'notistack';
import { FC } from 'react';
import BaseInvoiceForm from './InvoiceForm/BaseInvoiceForm';

const AddInvoice: FC<AddReceivedVoucherModalProps> = ({ onClose }) => {
  const { enqueueSnackbar } = useSnackbar();
  const { mutateAsync: addInvoice } = useAddExpenseByType('invoice');

  const handleSubmit: FormikConfig<ExtendedInvoice>['onSubmit'] = (
    values,
    { setSubmitting, resetForm }
  ) => {
    addInvoice(values)
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
        infoText="Ingrese los datos de la factura recibida. Los campos marcados con * son obligatorios. Si la factura tiene un proyecto asociado, selecciónelo en el campo correspondiente."
        onClose={onClose}
        initialValues={EXTENDED_INVOICE_INITIAL_VALUE}
        onSubmit={handleSubmit}
      />
    </>
  );
};

export default AddInvoice;
