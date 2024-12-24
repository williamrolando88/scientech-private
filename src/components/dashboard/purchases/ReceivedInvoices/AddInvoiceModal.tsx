import { DialogTitle } from '@mui/material';
import AddPurchaseDocumentModal from '@src/components/shared/AddPurchaseDocumentModal';
import { RECEIVED_INVOICE_INITIAL_VALUE } from '@src/lib/constants/purchases';
import { PurchasesFirestore } from '@src/services/firestore/purchases';
import { Purchase, ReceivedInvoice } from '@src/types/purchases';
import { FormikConfig } from 'formik';
import { useSnackbar } from 'notistack';
import { FC } from 'react';
import BaseInvoiceForm from './InvoiceForm/BaseInvoiceForm';

interface Props {
  onClose?: VoidFunction;
}

const AddInvoice: FC<Props> = ({ onClose }) => {
  const { enqueueSnackbar } = useSnackbar();

  const handleSubmit: FormikConfig<ReceivedInvoice>['onSubmit'] = (
    values,
    { setSubmitting, resetForm }
  ) => {
    const purchase: Purchase = {
      purchaseData: values,
      type: 'receivedInvoice',
    };

    PurchasesFirestore.create(purchase)
      .then(() => {
        resetForm();
        enqueueSnackbar('Factura guardada exitosamente');
        onClose?.();
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

  return (
    <>
      <DialogTitle>Agregar nueva factura de compra</DialogTitle>

      <BaseInvoiceForm
        infoText="Ingrese los datos de la factura recibida. Los campos marcados con * son obligatorios. Si la factura tiene un proyecto asociado, selecciónelo en el campo correspondiente."
        onClose={onClose}
        initialValues={RECEIVED_INVOICE_INITIAL_VALUE}
        onSubmit={handleSubmit}
      />
    </>
  );
};

const AddInvoiceModal = () => (
  <AddPurchaseDocumentModal>
    <AddInvoice />
  </AddPurchaseDocumentModal>
);

export default AddInvoiceModal;
