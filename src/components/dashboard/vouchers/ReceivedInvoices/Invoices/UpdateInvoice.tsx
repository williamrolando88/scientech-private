import { Dialog, DialogTitle } from '@mui/material';
import { useListDayBookTransactions } from '@src/hooks/cache/dayBook';
import { useUpdateExpenseByType } from '@src/hooks/cache/expenses';
import { ExtendedInvoice, Invoice } from '@src/types/expenses';
import { FormikConfig } from 'formik';
import { useSnackbar } from 'notistack';
import { FC } from 'react';
import BaseInvoiceForm from './InvoiceForm/BaseInvoiceForm';

interface UpdateInvoiceProps {
  open: boolean;
  onClose: VoidFunction;
  initialValues: Invoice | null;
}

const UpdateInvoice: FC<UpdateInvoiceProps> = ({
  open,
  onClose,
  initialValues,
}) => {
  const { data: transactions, isLoading } = useListDayBookTransactions();
  const { enqueueSnackbar } = useSnackbar();
  const { mutateAsync: updateInvoice } = useUpdateExpenseByType('invoice');

  const handleSubmit: FormikConfig<ExtendedInvoice>['onSubmit'] = (
    values,
    { setSubmitting, resetForm }
  ) => {
    updateInvoice(values)
      .then(() => {
        resetForm();
        enqueueSnackbar('Factura actualizada exitosamente');
        onClose();
      })
      .catch((error) => {
        console.error(error);
        enqueueSnackbar('Error al actualizar la factura', { variant: 'error' });
      })
      .finally(() => {
        setSubmitting(false);
      });
  };

  if (!initialValues || isLoading) return null;

  const relatedTransaction = transactions?.find(
    (transaction) => transaction.id === initialValues.day_book_transaction_id
  );

  const extendedInvoice: ExtendedInvoice = {
    ...initialValues,
    transaction_details: relatedTransaction?.transactions ?? [],
  };

  return (
    <Dialog open={open && !isLoading} onClose={onClose} fullWidth maxWidth="md">
      <DialogTitle>Actualizar factura</DialogTitle>

      <BaseInvoiceForm
        infoText="Actualiza los datos de la factura recibida. Los campos marcados con * son obligatorios."
        onClose={onClose}
        initialValues={extendedInvoice}
        onSubmit={handleSubmit}
      />
    </Dialog>
  );
};

export default UpdateInvoice;
