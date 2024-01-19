import { Button, Dialog, DialogTitle } from '@mui/material';
import { FC, useState } from 'react';
import { AddDayBookTransactionForm } from './AddDayBookTransactionForm';

const AddDayBookTransaction: FC = () => {
  const [openModal, setOpenModal] = useState(false);
  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

  return (
    <>
      <Button variant="contained" onClick={handleOpenModal}>
        Nuevo
      </Button>

      <Dialog
        fullWidth
        maxWidth="lg"
        open={openModal}
        onClose={handleCloseModal}
      >
        <DialogTitle>Nuevo asiento contable</DialogTitle>

        <AddDayBookTransactionForm />
      </Dialog>
    </>
  );
};

export default AddDayBookTransaction;
