import { Payment } from '@src/types/purchases';

export const PAYMENT_INITIAL_VALUE: Payment = {
  amount: 0,
  paymentDate: new Date(),
  id: '',
  paymentAccount: '',
  ref: {},
};
