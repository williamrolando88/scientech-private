import { Button } from '@mui/material';
import { PAYMENT_COLLECTION_INITIAL_VALUE } from '@src/lib/constants/sale';
import { subId } from '@src/services/firestore/helpers/subIdGenerator';
import { SalesFirestore } from '@src/services/firestore/sales';
import { PaymentCollection, Sale } from '@src/types/sale';
import { FormikConfig } from 'formik';
import { FC, useState } from 'react';
import PaymentCollectionModal from './PaymentCollectionModal';

interface Props {
  sale: Sale;
}

const PaymentCollectionButton: FC<Props> = ({ sale }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  const handleSubmit: FormikConfig<PaymentCollection>['onSubmit'] = (
    values
  ) => {
    SalesFirestore.collectPayment({} as Sale);
  };

  const collected = Boolean(sale.paymentCollection);

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
      >
        {collected ? 'Cobrado' : 'Pendiente'}
      </Button>

      <PaymentCollectionModal
        open={modalOpen}
        onClose={closeModal}
        initialValues={sale.paymentCollection ?? initialValue}
        initialAmount={sale.paymentDue}
        onSubmit={handleSubmit}
      />
    </>
  );
};

export default PaymentCollectionButton;
