import { DialogTitle } from '@mui/material';
import { NON_DEDUCTIBLE_INITIAL_VALUE } from '@src/lib/constants/expenses';
import { AddReceivedInvoiceProps, Expense } from '@src/types/expenses';
import { FormikConfig } from 'formik';
import { FC } from 'react';
import BaseNonDeductibleForm from './BaseNonDeductibleForm';

const AddNonDeductible: FC<AddReceivedInvoiceProps> = ({ onClose }) => {
  const handleSubmit: FormikConfig<Expense>['onSubmit'] = () => {};

  return (
    <>
      <DialogTitle>Agregar Nuevo Gasto no Deducible</DialogTitle>

      <BaseNonDeductibleForm
        onClose={onClose}
        initialValues={NON_DEDUCTIBLE_INITIAL_VALUE}
        onSubmit={handleSubmit}
      />
    </>
  );
};

export default AddNonDeductible;
