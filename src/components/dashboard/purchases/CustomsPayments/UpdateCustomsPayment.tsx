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
    PurchasesFirestore.update({ purchaseData: values })
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

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
      <DialogTitle>Actualizar liquidación aduanera</DialogTitle>

      <BaseCustomsPaymentForm
        infoText="Actualiza los datos de la liquidación aduanera recibida. Los campos marcados con * son obligatorios."
        onClose={onClose}
        initialValues={initialValues}
        onSubmit={handleSubmit}
      />
    </Dialog>
  );
};

export default UpdateCustomsPayment;
