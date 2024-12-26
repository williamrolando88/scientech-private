import { Dialog, DialogTitle } from '@mui/material';
import { PurchasesFirestore } from '@src/services/firestore/purchases';
import { ReceivedInvoice } from '@src/types/purchases';
import { FormikConfig } from 'formik';
import { useSnackbar } from 'notistack';
import { FC } from 'react';
import BaseInvoiceForm from './InvoiceForm/BaseInvoiceForm';

interface UpdateInvoiceProps {
  open: boolean;
  onClose: VoidFunction;
  initialValues: ReceivedInvoice | null;
}

const UpdateInvoice: FC<UpdateInvoiceProps> = ({
  open,
  onClose,
  initialValues,
}) => {
  const { enqueueSnackbar } = useSnackbar();

  const handleSubmit: FormikConfig<ReceivedInvoice>['onSubmit'] = (
    values,
    { setSubmitting, resetForm }
  ) => {
    PurchasesFirestore.update({ id: values.id, purchaseData: values })
      .then(() => {
        resetForm();
        enqueueSnackbar('Factura actualizada exitosamente');
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
      <DialogTitle>Actualizar factura</DialogTitle>

      <BaseInvoiceForm
        infoText="Actualiza los datos de la factura recibida. Los campos marcados con * son obligatorios."
        onClose={onClose}
        initialValues={initialValues}
        onSubmit={handleSubmit}
      />
    </Dialog>
  );
};

export default UpdateInvoice;
