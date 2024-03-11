import { Expense, Invoice } from '@src/types/expenses';

export const INVOICE_INITIAL_VALUE: Invoice = {
  id: '',
  issuer_name: '',
  issuer_date: new Date(),
  type: 'invoice',
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
  issuer_name: '',
  issuer_date: new Date(),
  type: 'non_deductible',
  day_book_transaction_id: '',
  tax_exempted_subtotal: 0,
  description: '',
  project_id: '',
};
