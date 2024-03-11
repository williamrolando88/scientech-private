import { Button, Dialog } from '@mui/material';
import { ExpenseType } from '@src/types/expenses';
import { useRouter } from 'next/router';
import { FC, ReactElement, useCallback, useMemo, useState } from 'react';
import AddInvoice from './Forms/InvoiceForm/AddInvoice';
import AddNonDeductible from './Forms/NonDeductibleForm/AddNonDeductible';

const AddReceivedInvoice: FC = () => {
  const router = useRouter();
  const [modalOpen, setModalOpen] = useState(false);
  const handleModalOpen = () => setModalOpen(true);
  const handleModalClose = () => setModalOpen(false);

  const FormSelector: Record<ExpenseType, ReactElement> = useMemo(
    () => ({
      invoice: <AddInvoice onClose={handleModalClose} />,
      customs_payment: <div />,
      non_deductible: <AddNonDeductible onClose={handleModalClose} />,
      sale_note: <div />,
    }),
    []
  );

  const FormComponent = useCallback(
    () => FormSelector[router.query.type as ExpenseType],
    [FormSelector, router.query.type]
  );

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
        <FormComponent />
      </Dialog>
    </>
  );
};

export default AddReceivedInvoice;
