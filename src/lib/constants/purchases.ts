import { ExtendedExpense } from '@src/types/expenses';
import {
  CustomsPayment,
  ReceivedInvoice,
  SaleNote,
} from '@src/types/purchases';
import { DAYBOOK_TRANSACTION_DETAIL_INITIAL_VALUE } from './dayBook';

export const RECEIVED_INVOICE_INITIAL_VALUE: ReceivedInvoice = {
  id: '',
  issueDate: new Date(),
  issuerName: '',
  issuerId: '',
  IVA: 0,
  taxedSubtotal: 0,
  description: '',
  establishment: 1,
  emissionPoint: 1,
  sequentialNumber: 1,
  total: 0,
  noTaxSubtotal: 0,
  paid: false,
  ref: {
    projectId: '',
  },
};

export const CUSTOMS_PAYMENT_INITIAL_VALUE: CustomsPayment = {
  id: '',
  customsPaymentNumber: '',
  issueDate: new Date(),
  IVA: 0,
  description: '',
  adValoremTariff: 0,
  specificTariff: 0,
  FODINFA: 0,
  total: 0,
  paid: false,
  ref: {
    projectId: '',
  },
};

export const NON_DEDUCTIBLE_INITIAL_VALUE: ExtendedExpense = {
  id: '',
  issue_date: new Date(),
  type: 'non_deductible',
  issuer_name: '',
  day_book_transaction_id: '',
  tax_exempted_subtotal: 0,
  description: '',
  project_id: '',
  total: 0,
  /**
   * This is an array of DayBookTransactionDetail objects.
   * It is used to store the transactions related to the invoice.
   *
   * First element will always be the payment method.
   * Second element will always be the sum of the subtotals.
   */
  transaction_details: new Array(2).fill(
    DAYBOOK_TRANSACTION_DETAIL_INITIAL_VALUE
  ),
};

export const SALE_NOTE_INITIAL_VALUE: SaleNote = {
  id: '',
  issueDate: new Date(),
  issuerName: '',
  description: '',
  total: 0,
  issuerId: '',
  establishment: 1,
  emissionPoint: 1,
  sequentialNumber: 1,
  paid: false,
  ref: {
    projectId: '',
  },
};
