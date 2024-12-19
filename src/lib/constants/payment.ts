import { Payment } from '@src/types/payment';

export const PAYMENT_INITIAL_VALUE: Payment = {
  amount: 0,
  createdAt: new Date(),
  id: '',
  paymentAccount: '',
  ref: {},
};
