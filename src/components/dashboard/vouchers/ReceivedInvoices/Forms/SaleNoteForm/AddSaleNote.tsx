import { DialogTitle } from '@mui/material';
import { SALE_NOTE_INITIAL_VALUE } from '@src/lib/constants/expenses';
import { AddReceivedInvoiceProps, Expense } from '@src/types/expenses';
import { FormikConfig } from 'formik';
import { FC } from 'react';
import BaseSaleNoteForm from './BaseSaleNoteForm';

const AddSaleNote: FC<AddReceivedInvoiceProps> = ({ onClose }) => {
  const handleSubmit: FormikConfig<Expense>['onSubmit'] = () => {};

  return (
    <>
      <DialogTitle>Agregar Nueva Nota de Venta</DialogTitle>

      <BaseSaleNoteForm
        onClose={onClose}
        initialValues={SALE_NOTE_INITIAL_VALUE}
        onSubmit={handleSubmit}
      />
    </>
  );
};

export default AddSaleNote;
