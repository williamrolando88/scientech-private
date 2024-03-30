import { CustomsPayment, Expense, ExtendedInvoice } from '@src/types/expenses';
import { DAYBOOK_TRANSACTION_DETAIL_INITIAL_VALUE } from './dayBook';

export const EXTENDED_INVOICE_INITIAL_VALUE: ExtendedInvoice = {
  id: '',
  issue_date: new Date(),
  type: 'invoice',
  issuer_name: '',
  issuer_id: '',
  day_book_transaction_id: '',
  IVA: 0,
  tax_exempted_subtotal: 0,
  taxed_subtotal: 0,
  description: '',
  project_id: '',
  establishment: 1,
  emission_point: 1,
  sequential_number: 1,
  total: 0,
  /**
   * This is an array of DayBookTransactionDetail objects.
   * It is used to store the transactions related to the invoice.
   *
   * First element will always be the payment method.
   * Second element will always be the sum of the subtotals.
   * Third element will always be the IVA total.
   */
  transaction_details: new Array(3).fill(
    DAYBOOK_TRANSACTION_DETAIL_INITIAL_VALUE
  ),
};

export const NON_DEDUCTIBLE_INITIAL_VALUE: Expense = {
  id: '',
  issue_date: new Date(),
  type: 'non_deductible',
  issuer_name: '',
  day_book_transaction_id: '',
  tax_exempted_subtotal: 0,
  description: '',
  project_id: '',
  total: 0,
};

export const CUSTOMS_PAYMENT_INITIAL_VALUE: CustomsPayment = {
  id: '',
  issue_date: new Date(),
  type: 'customs_payment',
  day_book_transaction_id: '',
  IVA: 0,
  description: '',
  project_id: '',
  adValorem_tariff: 0,
  specific_tariff: 0,
  tariff: 0,
  total: 0,
};

export const SALE_NOTE_INITIAL_VALUE: Expense = {
  id: '',
  issue_date: new Date(),
  type: 'sale_note',
  issuer_name: '',
  day_book_transaction_id: '',
  tax_exempted_subtotal: 0,
  description: '',
  project_id: '',
  total: 0,
};
