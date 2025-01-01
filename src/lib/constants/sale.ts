import { PaymentCollection } from '@src/types/sale';
import { DEFAULT_ACCOUNT } from './settings';

export const PAYMENT_COLLECTION_INITIAL_VALUE: PaymentCollection = {
  id: '',
  advancePaymentAmount: 0,
  amount: 0,
  paymentAccount: DEFAULT_ACCOUNT.MAIN_BANK_ACCOUNT,
  paymentDate: new Date(),
  ref: {},
};
