import { Button, Dialog } from '@mui/material';
import { cloneElement, FC, ReactElement, useState } from 'react';

interface Props {
  children: ReactElement;
}

const AddPurchaseDocumentModal: FC<Props> = ({ children }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const handleModalOpen = () => setModalOpen(true);
  const handleModalClose = () => setModalOpen(false);

  return (
    <>
      <Button variant="contained" onClick={handleModalOpen}>
        Nuevo
      </Button>

      <Dialog
        fullWidth
        maxWidth="md"
        open={modalOpen}
        onClose={handleModalClose}
      >
        {cloneElement(children, { onClose: handleModalClose })}
      </Dialog>
    </>
  );
};

export default AddPurchaseDocumentModal;
