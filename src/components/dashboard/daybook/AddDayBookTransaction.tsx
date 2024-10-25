import { Button, Dialog, DialogTitle } from '@mui/material';
import { DayBookTransactionSchema } from '@src/lib/schemas/dayBook';
import { FormikConfig } from 'formik';
import { useSnackbar } from 'notistack';
import { FC, useState } from 'react';
import { useAddDayBookTransactions } from 'src/hooks/cache/dayBook';
import { DAYBOOK_TRANSACTION_INITIAL_VALUE } from 'src/lib/constants/dayBook';
import { DayBookTransactionOld } from 'src/types/dayBook';
import { toFormikValidationSchema } from 'zod-formik-adapter';
import { DayBookTransactionForm } from './DayBookTransactionForm';

const AddDayBookTransaction: FC = () => {
  const [openModal, setOpenModal] = useState(false);
  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

  const { enqueueSnackbar } = useSnackbar();
  const { mutateAsync: addTransaction } = useAddDayBookTransactions();

  const onSubmit: FormikConfig<DayBookTransactionOld>['onSubmit'] = async (
    values,
    { setSubmitting, resetForm }
  ) => {
    setSubmitting(true);

    addTransaction(values)
      .then(() => {
        resetForm();
        enqueueSnackbar('Transacción guardada exitosamente');
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

  return (
    <>
      <Button variant="contained" onClick={handleOpenModal}>
        Nuevo
      </Button>

      <Dialog
        fullWidth
        maxWidth="lg"
        open={openModal}
        onClose={handleCloseModal}
      >
        <DialogTitle>Agregar Transacción</DialogTitle>

        <DayBookTransactionForm
          infoText="Aquí puedes agregar nuevas transacciones, en los campos de débito y crédito puedes usar operaciones matemáticas básicas (+, -, *, /) para calcular el valor de la transacción. El color de los campos indica incremento (verde) o decremento (rojo)."
          initialValues={DAYBOOK_TRANSACTION_INITIAL_VALUE}
          onSubmit={onSubmit}
          validationSchema={toFormikValidationSchema(DayBookTransactionSchema)}
          onClose={handleCloseModal}
        />
      </Dialog>
    </>
  );
};

export default AddDayBookTransaction;
