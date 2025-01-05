import { IconButton } from '@mui/material';
import Iconify from '@src/components/shared/iconify';
import { Sale } from '@src/types/sale';
import { FC, useState } from 'react';
import UpsertWithholding from './UpsertWithholding';

interface Props {
  sale: Sale;
}

const AddWithholding: FC<Props> = ({ sale }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  return (
    <>
      <IconButton onClick={openModal}>
        <Iconify
          icon="pajamas:review-warning"
          sx={{ color: (theme) => theme.palette.warning.main }}
        />
      </IconButton>
      <UpsertWithholding open={modalOpen} onClose={closeModal} sale={sale} />
    </>
  );
};

export default AddWithholding;
