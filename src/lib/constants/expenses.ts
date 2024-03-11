import { CustomsPayment, Expense, Invoice } from '@src/types/expenses';

export const INVOICE_INITIAL_VALUE: Invoice = {
  id: '',
  issuer_date: new Date(),
  type: 'invoice',
  issuer_name: '',
  issuer_id: '',
  day_book_transaction_id: '',
  IVA: 0,
  tax_exempted_subtotal: 0,
  taxed_subtotal: 0,
  description: '',
  project_id: '',
};

export const NON_DEDUCTIBLE_INITIAL_VALUE: Expense = {
  id: '',
  issuer_date: new Date(),
  type: 'non_deductible',
  issuer_name: '',
  day_book_transaction_id: '',
  tax_exempted_subtotal: 0,
  description: '',
  project_id: '',
};

export const CUSTOMS_PAYMENT_INITIAL_VALUE: CustomsPayment = {
  id: '',
  issuer_date: new Date(),
  type: 'customs_payment',
  day_book_transaction_id: '',
  IVA: 0,
  description: '',
  project_id: '',
  adValorem_tariff: 0,
  specific_tariff: 0,
  tariff: 0,
};

export const SALE_NOTE_INITIAL_VALUE: Expense = {
  id: '',
  issuer_date: new Date(),
  type: 'sale_note',
  issuer_name: '',
  day_book_transaction_id: '',
  tax_exempted_subtotal: 0,
  description: '',
  project_id: '',
};
