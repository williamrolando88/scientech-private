import { Dialog, DialogTitle } from '@mui/material';
import { FirestoreNonDeductible } from '@src/services/firestore/purchases/nonDeductible';
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
    FirestoreNonDeductible.upsert(values)
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

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
      <DialogTitle>Actualizar gasto no deducible</DialogTitle>

      <BaseNonDeductibleForm
        infoText="Actualiza los datos no deducibles. Los campos marcados con * son obligatorios."
        onClose={onClose}
        initialValues={initialValues}
        onSubmit={handleSubmit}
      />
    </Dialog>
  );
};

export default UpdateNonDeductible;
