import { Button, Dialog, DialogTitle } from '@mui/material';
import { FormikConfig } from 'formik';
import { useSnackbar } from 'notistack';
import { FC, useState } from 'react';
import { useAddDayBookTransactions } from 'src/hooks/cache/dayBook';
import { DAYBOOK_TRANSACTION_INITIAL_VALUE } from 'src/lib/constants/dayBook';
import { DayBookTransactionParser } from 'src/lib/parsers/dayBook';
import { DayBookTransaction } from 'src/types/dayBook';
import { toFormikValidationSchema } from 'zod-formik-adapter';
import { DayBookTransactionForm } from './DayBookTransactionForm';

const AddDayBookTransaction: FC = () => {
  const [openModal, setOpenModal] = useState(false);
  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

  const { enqueueSnackbar } = useSnackbar();
  const { mutateAsync: addTransaction } = useAddDayBookTransactions();

  const onSubmit: FormikConfig<DayBookTransaction>['onSubmit'] = async (
    values,
    { setSubmitting, resetForm }
  ) => {
    setSubmitting(true);

    addTransaction(values)
      .then(() => {
        resetForm();
        handleCloseModal();
        enqueueSnackbar('Transacción guardada exitosamente');
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
        <DialogTitle>Nueva transacción</DialogTitle>

        <DayBookTransactionForm
          infoText="Aquí puedes agregar nuevas transacciones"
          initialValues={DAYBOOK_TRANSACTION_INITIAL_VALUE}
          onSubmit={onSubmit}
          validationSchema={toFormikValidationSchema(DayBookTransactionParser)}
          onClose={handleCloseModal}
        />
      </Dialog>
    </>
  );
};

export default AddDayBookTransaction;
