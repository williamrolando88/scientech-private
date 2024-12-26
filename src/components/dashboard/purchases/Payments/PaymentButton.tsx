import { Button } from '@mui/material';
import { PAYMENT_INITIAL_VALUE } from '@src/lib/constants/payment';
import { PurchasesFirestore } from '@src/services/firestore/purchases';
import { Payment } from '@src/types/payment';
import { Purchase } from '@src/types/purchases';
import { FormikConfig } from 'formik';
import { useSnackbar } from 'notistack';
import { FC, useState } from 'react';
import PaymentModal from './PaymentModal';

interface Props {
  purchase?: Purchase;
}

const PaymentButton: FC<Props> = ({ purchase }) => {
  const { enqueueSnackbar } = useSnackbar();
  const [modalOpen, setModalOpen] = useState(false);
  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  if (!purchase?.purchaseData) return null;

  const handleSubmit: FormikConfig<Payment>['onSubmit'] = (
    values,
    { resetForm, setSubmitting }
  ) => {
    const payment: Payment = {
      ...values,
      ref: { ...purchase.purchaseData.ref, purchaseId: purchase.id },
    };

    PurchasesFirestore.pay({ id: purchase.id, payment })
      .then(() => {
        resetForm();
        enqueueSnackbar('Pago registrado exitosamente');
        closeModal();
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

  const handleDelete = () => {
    PurchasesFirestore.unpay({ id: purchase.id })
      .then(() => {
        enqueueSnackbar('Pago eliminado exitosamente');
      })
      .catch((error) => {
        console.error(error);
        enqueueSnackbar(`No se pudo eliminar el documento. ${error}`, {
          variant: 'error',
        });
      })
      .finally(() => {
        closeModal();
      });
  };

  const { paid } = purchase.purchaseData;

  return (
    <>
      <Button
        color={paid ? 'success' : 'warning'}
        variant="soft"
        onClick={openModal}
        sx={{ width: '80px' }}
      >
        {paid ? 'Pagado' : 'Pagar'}
      </Button>

      <PaymentModal
        open={modalOpen}
        paid={paid}
        initialValue={{
          ...PAYMENT_INITIAL_VALUE,
          amount: purchase.purchaseData.total,
          ...purchase.payment,
        }}
        onClose={closeModal}
        onSubmit={handleSubmit}
        onDelete={handleDelete}
      />
    </>
  );
};

export default PaymentButton;
