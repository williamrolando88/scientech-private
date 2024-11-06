import { DialogTitle } from '@mui/material';
import AddPurchaseDocumentModal from '@src/components/shared/AddPurchaseDocumentModal';
import { useAddExpenseByType } from '@src/hooks/cache/expenses';
import { CUSTOMS_PAYMENT_INITIAL_VALUE } from '@src/lib/constants/expenses';
import { ExtendedCustomsPayment } from '@src/types/expenses';
import { FormikConfig } from 'formik';
import { useSnackbar } from 'notistack';
import { FC } from 'react';
import BaseCustomsPaymentForm from './CustomsPaymentForm/BaseCustomsPaymentForm';

interface Props {
  onClose?: VoidFunction;
}

const AddCustomsPayment: FC<Props> = ({ onClose }) => {
  const { enqueueSnackbar } = useSnackbar();
  const { mutateAsync: addCustomsPayment } =
    useAddExpenseByType('customs_payment');

  const handleSubmit: FormikConfig<ExtendedCustomsPayment>['onSubmit'] = (
    values,
    { setSubmitting, resetForm }
  ) => {
    addCustomsPayment(values)
      .then(() => {
        resetForm();
        enqueueSnackbar('Liquidación aduanera guardada exitosamente');
        onClose?.();
      })
      .catch((error) => {
        console.error(error);
        enqueueSnackbar('Error al guardar la liquidación aduanera', {
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

const AddInvoiceModal = () => (
  <AddPurchaseDocumentModal>
    <AddCustomsPayment />
  </AddPurchaseDocumentModal>
);

export default AddInvoiceModal;
