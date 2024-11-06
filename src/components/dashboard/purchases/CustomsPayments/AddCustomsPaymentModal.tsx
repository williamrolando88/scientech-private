import { DialogTitle } from '@mui/material';
import AddPurchaseDocumentModal from '@src/components/shared/AddPurchaseDocumentModal';
import { CUSTOMS_PAYMENT_INITIAL_VALUE } from '@src/lib/constants/purchases';
import { FirestoreCustomsPayment } from '@src/services/firebase/purchases/customsPayments';
import { CustomsPayment } from '@src/types/purchases';
import { FormikConfig } from 'formik';
import { useSnackbar } from 'notistack';
import { FC } from 'react';
import BaseCustomsPaymentForm from './CustomsPaymentForm/BaseCustomsPaymentForm';

interface Props {
  onClose?: VoidFunction;
}

const AddCustomsPayment: FC<Props> = ({ onClose }) => {
  const { enqueueSnackbar } = useSnackbar();

  const handleSubmit: FormikConfig<CustomsPayment>['onSubmit'] = (
    values,
    { setSubmitting, resetForm }
  ) => {
    FirestoreCustomsPayment.upsert(values)
      .then(() => {
        resetForm();
        enqueueSnackbar('Liquidación aduanera guardada exitosamente');
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
      <DialogTitle>Agregar nueva liquidación aduanera</DialogTitle>

      <BaseCustomsPaymentForm
        infoText="Ingrese los datos de la liquidación aduanera. Los campos marcados con * son obligatorios. Si la liquidación aduanera esta asociada a un proyecto, selecciónelo en el campo correspondiente"
        onClose={onClose}
        initialValues={CUSTOMS_PAYMENT_INITIAL_VALUE}
        onSubmit={handleSubmit}
      />
    </>
  );
};

const AddCustomsPaymentModal = () => (
  <AddPurchaseDocumentModal>
    <AddCustomsPayment />
  </AddPurchaseDocumentModal>
);

export default AddCustomsPaymentModal;
