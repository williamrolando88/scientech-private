import { DialogTitle } from '@mui/material';
import { CUSTOMS_PAYMENT_INITIAL_VALUE } from '@src/lib/constants/expenses';
import {
  AddReceivedVoucherModalProps,
  CustomsPayment,
} from '@src/types/expenses';
import { FormikConfig } from 'formik';
import { FC } from 'react';
import BaseCustomsPaymentForm from './BaseCustomsPaymentForm';

const AddCustomsPayment: FC<AddReceivedVoucherModalProps> = ({ onClose }) => {
  const handleSubmit: FormikConfig<CustomsPayment>['onSubmit'] = () => {};

  return (
    <>
      <DialogTitle>Agregar Nueva Liquidación Aduanera</DialogTitle>

      <BaseCustomsPaymentForm
        onClose={onClose}
        initialValues={CUSTOMS_PAYMENT_INITIAL_VALUE}
        onSubmit={handleSubmit}
      />
    </>
  );
};

export default AddCustomsPayment;
