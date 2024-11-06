import { Dialog, DialogTitle } from '@mui/material';
import { useListDayBookTransactions } from '@src/hooks/cache/dayBook';
import { useUpdateExpenseByType } from '@src/hooks/cache/expenses';
import { CustomsPaymentOld, ExtendedCustomsPayment } from '@src/types/expenses';
import { FormikConfig } from 'formik';
import { useSnackbar } from 'notistack';
import { FC } from 'react';
import BaseCustomsPaymentForm from './CustomsPaymentForm/BaseCustomsPaymentForm';

interface UpdateCustomsPaymentProps {
  open: boolean;
  onClose: VoidFunction;
  initialValues: CustomsPaymentOld | null;
}

const UpdateCustomsPayment: FC<UpdateCustomsPaymentProps> = ({
  open,
  onClose,
  initialValues,
}) => {
  const { data: transactions, isLoading } = useListDayBookTransactions();
  const { enqueueSnackbar } = useSnackbar();
  const { mutateAsync: updateCustomsPayment } =
    useUpdateExpenseByType('customs_payment');

  const handleSubmit: FormikConfig<ExtendedCustomsPayment>['onSubmit'] = (
    values,
    { setSubmitting, resetForm }
  ) => {
    updateCustomsPayment(values)
      .then(() => {
        resetForm();
        enqueueSnackbar('Liquidación aduanera actualizada exitosamente');
        onClose();
      })
      .catch((error) => {
        console.error(error);
        enqueueSnackbar('Error al actualizar la liquidación aduanera', {
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

  const extendedCustomsPayment: ExtendedCustomsPayment = {
    ...initialValues,
    transaction_details: relatedTransaction?.transactions ?? [],
  };

  return (
    <Dialog open={open && !isLoading} onClose={onClose} fullWidth maxWidth="md">
      <DialogTitle>Actualizar liquidación aduanera</DialogTitle>

      <BaseCustomsPaymentForm
        infoText="Actualiza los datos de la liquidación aduanera recibida. Los campos marcados con * son obligatorios."
        onClose={onClose}
        initialValues={extendedCustomsPayment}
        onSubmit={handleSubmit}
      />
    </Dialog>
  );
};

export default UpdateCustomsPayment;
