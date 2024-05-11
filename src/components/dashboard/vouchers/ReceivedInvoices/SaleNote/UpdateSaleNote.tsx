import { Dialog, DialogTitle } from '@mui/material';
import { useListDayBookTransactions } from '@src/hooks/cache/dayBook';
import { useUpdateExpenseByType } from '@src/hooks/cache/expenses';
import { Expense, ExtendedExpense } from '@src/types/expenses';
import { FormikConfig } from 'formik';
import { useSnackbar } from 'notistack';
import { FC } from 'react';
import BaseSaleNoteForm from './SaleNoteForm/BaseSaleNoteForm';

interface UpdateSaleNoteProps {
  open: boolean;
  onClose: VoidFunction;
  initialValues: Expense | null;
}

const UpdateSaleNote: FC<UpdateSaleNoteProps> = ({
  open,
  onClose,
  initialValues,
}) => {
  const { data: transactions, isLoading } = useListDayBookTransactions();
  const { enqueueSnackbar } = useSnackbar();
  const { mutateAsync: updateExpense } = useUpdateExpenseByType('sale_note');

  const handleSubmit: FormikConfig<ExtendedExpense>['onSubmit'] = (
    values,
    { setSubmitting, resetForm }
  ) => {
    updateExpense(values)
      .then(() => {
        resetForm();
        enqueueSnackbar('Nota de venta actualizada exitosamente');
        onClose();
      })
      .catch((error) => {
        console.error(error);
        enqueueSnackbar('Error al actualizar la nota de venta', {
          variant: 'error',
        });
      })
      .finally(() => {
        setSubmitting(false);
      });
  };

  if (!initialValues || isLoading) return null;

  const relatedTransaction = transactions?.find(
    (transaction) => transaction.id === initialValues.day_book_transaction_id
  );

  const extendedSaleNote: ExtendedExpense = {
    ...initialValues,
    transaction_details: relatedTransaction?.transactions ?? [],
  };

  return (
    <Dialog open={open && !isLoading} onClose={onClose} fullWidth maxWidth="md">
      <DialogTitle>Actualizar nota de venta</DialogTitle>

      <BaseSaleNoteForm
        infoText="Actualiza los datos de la nota de venta. Los campos marcados con * son obligatorios."
        onClose={onClose}
        initialValues={extendedSaleNote}
        onSubmit={handleSubmit}
      />
    </Dialog>
  );
};

export default UpdateSaleNote;
