import { Button, Dialog } from '@mui/material';
import { ExpenseTypeValues } from '@src/types/expenses';
import { useRouter } from 'next/router';
import { FC, ReactElement, useCallback, useMemo, useState } from 'react';
import AddCustomsPayment from './Forms/CustomsPaymentForm/AddCustomsPayment';
import AddNonDeductible from './Forms/NonDeductibleForm/AddNonDeductible';
import AddSaleNote from './Forms/SaleNoteForm/AddSaleNote';
import AddInvoice from './Invoices/AddInvoice';

const AddReceivedVoucher: FC = () => {
  const router = useRouter();
  const [modalOpen, setModalOpen] = useState(false);
  const handleModalOpen = () => setModalOpen(true);
  const handleModalClose = () => setModalOpen(false);

  const FormSelector: Record<ExpenseTypeValues, ReactElement> = useMemo(
    () => ({
      invoice: <AddInvoice onClose={handleModalClose} />,
      customs_payment: <AddCustomsPayment onClose={handleModalClose} />,
      non_deductible: <AddNonDeductible onClose={handleModalClose} />,
      sale_note: <AddSaleNote onClose={handleModalClose} />,
    }),
    []
  );

  const FormComponent = useCallback(
    () => FormSelector[router.query.type as ExpenseTypeValues],
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

export default AddReceivedVoucher;
