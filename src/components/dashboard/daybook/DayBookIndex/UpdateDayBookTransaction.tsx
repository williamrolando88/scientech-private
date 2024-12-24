import { Dialog, DialogTitle } from '@mui/material';
import { FirestoreDoubleEntryAccounting } from '@src/services/firestore/doubleEntryAccounting';
import { DoubleEntryAccounting } from '@src/types/doubleEntryAccounting';
import { FormikConfig } from 'formik';
import { useSnackbar } from 'notistack';
import { FC } from 'react';
import { DayBookTransactionForm } from '../DayBookTransactionForm';

interface UpdateDayBookTransactionProps {
  transaction: DoubleEntryAccounting | null;
  setTransaction: (transaction: DoubleEntryAccounting | null) => void;
}

export const UpdateDayBookTransaction: FC<UpdateDayBookTransactionProps> = ({
  setTransaction,
  transaction,
}) => {
  const handleCloseModal = () => setTransaction(null);
  const { enqueueSnackbar } = useSnackbar();

  const onSubmit: FormikConfig<DoubleEntryAccounting>['onSubmit'] = async (
    values,
    { setSubmitting, resetForm }
  ) => {
    setSubmitting(true);

    FirestoreDoubleEntryAccounting.upsert(values)
      .then(() => {
        resetForm();
        enqueueSnackbar('Transacción actualizada exitosamente');
        handleCloseModal();
      })
      .catch((error) => {
        console.error(error);
        enqueueSnackbar('Error al guardar la transacción', {
          variant: 'error',
        });
      })
      .finally(() => {
        setSubmitting(false);
      });
  };

  if (!transaction) return null;

  return (
    <Dialog
      fullWidth
      maxWidth="lg"
      open={Boolean(transaction)}
      onClose={handleCloseModal}
    >
      <DialogTitle>Actualizar Transacción</DialogTitle>

      <DayBookTransactionForm
        infoText="Aquí puedes modificar los datos de la transacción, en los campos de débito y crédito puedes usar operaciones matemáticas básicas (+, -, *, /) para calcular el valor de la transacción. El color de los campos indica incremento (verde) o decremento (rojo)."
        initialValues={transaction}
        onSubmit={onSubmit}
        onClose={handleCloseModal}
      />
    </Dialog>
  );
};
