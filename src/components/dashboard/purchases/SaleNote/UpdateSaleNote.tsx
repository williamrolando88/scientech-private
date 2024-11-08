import { Dialog, DialogTitle } from '@mui/material';
import { FirestoreSaleNote } from '@src/services/firebase/purchases/saleNote';
import { SaleNote } from '@src/types/purchases';
import { FormikConfig } from 'formik';
import { useSnackbar } from 'notistack';
import { FC } from 'react';
import BaseSaleNoteForm from './SaleNoteForm/BaseSaleNoteForm';

interface UpdateSaleNoteProps {
  open: boolean;
  onClose: VoidFunction;
  initialValues: SaleNote | null;
}

const UpdateSaleNote: FC<UpdateSaleNoteProps> = ({
  open,
  onClose,
  initialValues,
}) => {
  const { enqueueSnackbar } = useSnackbar();

  const handleSubmit: FormikConfig<SaleNote>['onSubmit'] = (
    values,
    { setSubmitting, resetForm }
  ) => {
    FirestoreSaleNote.upsert(values)
      .then(() => {
        resetForm();
        enqueueSnackbar('Nota de venta actualizada exitosamente');
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
      <DialogTitle>Actualizar nota de venta</DialogTitle>

      <BaseSaleNoteForm
        infoText="Actualiza los datos de la nota de venta. Los campos marcados con * son obligatorios."
        onClose={onClose}
        initialValues={initialValues}
        onSubmit={handleSubmit}
      />
    </Dialog>
  );
};

export default UpdateSaleNote;
