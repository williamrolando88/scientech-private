import { Button } from '@mui/material';
import { PAYMENT_COLLECTION_INITIAL_VALUE } from '@src/lib/constants/sale';
import { DEFAULT_ACCOUNT } from '@src/lib/constants/settings';
import { subId } from '@src/services/firestore/helpers/subIdGenerator';
import { SalesFirestore } from '@src/services/firestore/sales';
import { PaymentCollection, Sale } from '@src/types/sale';
import { FormikConfig } from 'formik';
import { useSnackbar } from 'notistack';
import { FC, useState } from 'react';
import PaymentCollectionModal from './PaymentCollectionModal';

interface Props {
  sale: Sale;
}

const PaymentCollectionButton: FC<Props> = ({ sale }) => {
  const { enqueueSnackbar } = useSnackbar();
  const [modalOpen, setModalOpen] = useState(false);
  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  const handleSubmit: FormikConfig<PaymentCollection>['onSubmit'] = (
    values,
    { resetForm, setSubmitting }
  ) => {
    SalesFirestore.collectPayment({ ...sale, paymentCollection: values })
      .then(() => {
        resetForm();
        enqueueSnackbar('Cobro registrado exitosamente');
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
    SalesFirestore.removePaymentCollection(sale)
      .then(() => {
        enqueueSnackbar('Cobro eliminado exitosamente');
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

  const collected = Boolean(sale.paymentCollection);
  const isDisabled =
    sale.billingDocument.saleAccount === DEFAULT_ACCOUNT.INCOME_ROOT;

  const initialValue: PaymentCollection = {
    ...PAYMENT_COLLECTION_INITIAL_VALUE,
    id: subId(sale.id ?? '', 'salePaymentCollection'),
    amount: sale.paymentDue,
  };

  return (
    <>
      <Button
        color={collected ? 'success' : 'warning'}
        variant="soft"
        onClick={openModal}
        sx={{ width: '80px' }}
        disabled={isDisabled}
      >
        {collected ? 'Cobrado' : 'Pendiente'}
      </Button>

      <PaymentCollectionModal
        open={modalOpen}
        onClose={closeModal}
        initialValues={sale.paymentCollection ?? initialValue}
        initialAmount={sale.paymentDue}
        onSubmit={handleSubmit}
        onDelete={sale.paymentCollection ? handleDelete : undefined}
      />
    </>
  );
};

export default PaymentCollectionButton;
