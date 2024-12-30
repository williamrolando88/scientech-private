import { Payment } from '@src/types/purchases';

export const PAYMENT_INITIAL_VALUE: Payment = {
  id: '',
  amount: 0,
  paymentDate: new Date(),
  paymentAccount: '',
  ref: {},
};
