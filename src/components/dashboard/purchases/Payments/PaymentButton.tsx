import { Button } from '@mui/material';
import { DocumentRef } from '@src/types/documentReference';
import { FC, useState } from 'react';
import PaymentModal from './PaymentModal';

interface Props {
  amount: number;
  id?: string;
  ref: DocumentRef;
}

const PaymentButton: FC<Props> = ({ amount, id, ref }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  console.log(`This is purchase ${id}`);

  /**
   * TODO: Add submit handler method
   * This method should build the ref object
   *
   * The payment doc id must be generated by firestore
   *
   * The goal for the payment modal is to be reusable for the update
   * payment option
   *
   *
   */

  return (
    <>
      <Button onClick={openModal}>Pagar</Button>
      <PaymentModal open={modalOpen} onClose={closeModal} amount={amount} />
    </>
  );
};

export default PaymentButton;