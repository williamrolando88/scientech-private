import { Dialog, DialogTitle } from '@mui/material';
import { FormikConfig } from 'formik';
import { useSnackbar } from 'notistack';
import { FC } from 'react';
import { useUpdateDayBookTransaction } from 'src/hooks/cache/dayBook';
import { DayBookTransactionParser } from 'src/lib/parsers/dayBook';
import { DayBookTransaction } from 'src/types/dayBook';
import { toFormikValidationSchema } from 'zod-formik-adapter';
import { DayBookTransactionForm } from './DayBookTransactionForm';

interface UpdateDayBookTransactionFormProps {
  transaction: DayBookTransaction | null;
  setTransaction: (transaction: DayBookTransaction | null) => void;
}
export const UpdateDayBookTransactionForm: FC<
  UpdateDayBookTransactionFormProps
> = ({ setTransaction, transaction }) => {
  const handleCloseModal = () => setTransaction(null);
  const { enqueueSnackbar } = useSnackbar();
  const { mutateAsync: updateTransaction } = useUpdateDayBookTransaction();

  const onSubmit: FormikConfig<DayBookTransaction>['onSubmit'] = async (
    values,
    { setSubmitting, resetForm }
  ) => {
    setSubmitting(true);

    updateTransaction(values)
      .then(() => {
        resetForm();
        handleCloseModal();
        enqueueSnackbar('Transacción actualizada exitosamente');
      })
      .catch(() => {
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
      <DialogTitle>Modificar transacción</DialogTitle>

      <DayBookTransactionForm
        infoText="Aquí puedes modificar los datos de la transacción"
        initialValues={transaction}
        onSubmit={onSubmit}
        onClose={handleCloseModal}
        validationSchema={toFormikValidationSchema(DayBookTransactionParser)}
      />
    </Dialog>
  );
};
