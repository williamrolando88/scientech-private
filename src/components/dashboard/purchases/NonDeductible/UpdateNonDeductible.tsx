import { Dialog, DialogTitle } from '@mui/material';
import { PurchasesFirestore } from '@src/services/firestore/purchases';
import { NonDeductible } from '@src/types/purchases';
import { FormikConfig } from 'formik';
import { useSnackbar } from 'notistack';
import { FC } from 'react';
import BaseNonDeductibleForm from './NonDeductibleForm/BaseNonDeductibleForm';

interface UpdateNonDeductibleProps {
  open: boolean;
  onClose: VoidFunction;
  initialValues: NonDeductible | null;
}

const UpdateNonDeductible: FC<UpdateNonDeductibleProps> = ({
  open,
  onClose,
  initialValues,
}) => {
  const { enqueueSnackbar } = useSnackbar();

  const handleSubmit: FormikConfig<NonDeductible>['onSubmit'] = (
    values,
    { setSubmitting, resetForm }
  ) => {
    PurchasesFirestore.update({ id: values.id, purchaseData: values })
      .then(() => {
        resetForm();
        enqueueSnackbar('Gasto actualizado exitosamente');
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
    ? 'El gasto no deducible ya fue pagado, unicamente puedes modificar los campos habilitados. Para poder modificarla, primero elimina el pago asociado'
    : 'Actualiza los datos del gasto no deducible recibido. Los campos marcados con * son obligatorios.';

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
      <DialogTitle>Actualizar gasto no deducible</DialogTitle>

      <BaseNonDeductibleForm
        infoText={infoText}
        onClose={onClose}
        initialValues={initialValues}
        onSubmit={handleSubmit}
      />
    </Dialog>
  );
};

export default UpdateNonDeductible;
