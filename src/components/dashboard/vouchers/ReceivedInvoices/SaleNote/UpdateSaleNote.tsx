import { Dialog, DialogTitle } from '@mui/material';
import { useListDayBookTransactions } from '@src/hooks/cache/dayBook';
import { useUpdateExpenseByType } from '@src/hooks/cache/expenses';
import { Expense, ExtendedExpense } from '@src/types/expenses';
import { FormikConfig } from 'formik';
import { useSnackbar } from 'notistack';
import { FC } from 'react';
import BaseNonDeductibleForm from './SaleNoteForm/SaleNoteForm';

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
  const { mutateAsync: updateSaleNote } =
    useUpdateExpenseByType('non_deductible');

  const handleSubmit: FormikConfig<ExtendedExpense>['onSubmit'] = (
    values,
    { setSubmitting, resetForm }
  ) => {
    updateSaleNote(values)
      .then(() => {
        resetForm();
        enqueueSnackbar('Gasto actualizado exitosamente');
        onClose();
      })
      .catch((error) => {
        console.error(error);
        enqueueSnackbar('Error al actualizar el gasto', { variant: 'error' });
      })
      .finally(() => {
        setSubmitting(false);
      });
  };

  if (!initialValues || isLoading) return null;

  const relatedTransaction = transactions?.find(
    (transaction) => transaction.id === initialValues.day_book_transaction_id
  );

  const extendedNonDeductible: ExtendedExpense = {
    ...initialValues,
    transaction_details: relatedTransaction?.transactions ?? [],
  };

  return (
    <Dialog open={open && !isLoading} onClose={onClose} fullWidth maxWidth="md">
      <DialogTitle>Actualizar nota de venta</DialogTitle>

      <BaseNonDeductibleForm
        infoText="Actualiza los datos de la nota de venta. Los campos marcados con * son obligatorios."
        onClose={onClose}
        initialValues={extendedNonDeductible}
        onSubmit={handleSubmit}
      />
    </Dialog>
  );
};

export default UpdateSaleNote;
