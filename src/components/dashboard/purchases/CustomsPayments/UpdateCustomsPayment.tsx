import { Dialog, DialogTitle } from '@mui/material';
import { PurchasesFirestore } from '@src/services/firestore/purchases';
import { CustomsPayment } from '@src/types/purchases';
import { FormikConfig } from 'formik';
import { useSnackbar } from 'notistack';
import { FC } from 'react';
import BaseCustomsPaymentForm from './CustomsPaymentForm/BaseCustomsPaymentForm';

interface UpdateCustomsPaymentProps {
  open: boolean;
  onClose: VoidFunction;
  initialValues: CustomsPayment | null;
}

const UpdateCustomsPayment: FC<UpdateCustomsPaymentProps> = ({
  open,
  onClose,
  initialValues,
}) => {
  const { enqueueSnackbar } = useSnackbar();

  const handleSubmit: FormikConfig<CustomsPayment>['onSubmit'] = (
    values,
    { setSubmitting, resetForm }
  ) => {
    PurchasesFirestore.update({ id: values.id, purchaseData: values })
      .then(() => {
        resetForm();
        enqueueSnackbar('Liquidación aduanera actualizada exitosamente');
        onClose();
      })
      .catch((error) => {
        console.error(error);
        enqueueSnackbar(`No se pudo guardar el documento. ${error}`, {
          variant: 'error',
        });
      })
      .finally(() => {
        setSubmitting(false);
      });
  };

  if (!initialValues) return null;

  const infoText = initialValues.paid
    ? 'La liquidación aduanera ya fue pagada, no puedes modificarla. Para poder modificarla, primero elimina el pago asociado'
    : 'Actualiza los datos de la liquidación aduanera recibida. Los campos marcados con * son obligatorios.';

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
      <DialogTitle>Actualizar liquidación aduanera</DialogTitle>

      <BaseCustomsPaymentForm
        infoText={infoText}
        onClose={onClose}
        initialValues={initialValues}
        onSubmit={handleSubmit}
      />
    </Dialog>
  );
};

export default UpdateCustomsPayment;
