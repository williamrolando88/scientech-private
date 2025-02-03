import { Dialog, DialogTitle } from '@mui/material';
import { PurchasesFirestore } from '@src/services/firestore/purchases';
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
    PurchasesFirestore.update({ id: values.id, purchaseData: values })
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

  const infoText = initialValues.paid
    ? 'La nota de venta ya fue pagada, unicamente puedes modificar los campos habilitados. Para poder modificarla, primero elimina el pago asociado'
    : 'Actualiza los datos de la nota de venta recibida. Los campos marcados con * son obligatorios.';

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
      <DialogTitle>Actualizar nota de venta</DialogTitle>

      <BaseSaleNoteForm
        infoText={infoText}
        onClose={onClose}
        initialValues={initialValues}
        onSubmit={handleSubmit}
      />
    </Dialog>
  );
};

export default UpdateSaleNote;
