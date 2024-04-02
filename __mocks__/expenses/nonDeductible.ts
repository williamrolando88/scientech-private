import { ExtendedExpense } from '@src/types/expenses';

export const _sourceNonDeductible: ExtendedExpense = {
  id: '',
  issuer_name: 'Test',
  tax_exempted_subtotal: 10,
  issue_date: new Date('2024-04-02T20:42:31.655Z'),
  type: 'invoice',
  day_book_transaction_id: '',
  description: 'asdasd',
  project_id: '',
  total: 10,
  transaction_details: [
    {
      account_id: '1.01.01.03.01',
      debit: 0,
      credit: 0,
      description: '',
      invoice_id: '' as unknown as number,
      quotation_id: '' as unknown as number,
      expense_id: '',
      project_id: '',
    },
    {
      account_id: '5.02.01.17',
      debit: 0,
      credit: 0,
      description: '',
      invoice_id: '' as unknown as number,
      quotation_id: '' as unknown as number,
      expense_id: '',
      project_id: '',
    },
  ],
};

export const _processedNonDeductible: ExtendedExpense = {
  id: '',
  issuer_name: 'Test',
  tax_exempted_subtotal: 10,
  issue_date: new Date('2024-04-02T20:42:31.655Z'),
  type: 'invoice',
  day_book_transaction_id: '',
  description: 'asdasd',
  project_id: '',
  total: 10,
  transaction_details: [
    {
      account_id: '1.01.01.03.01',
      debit: 0,
      credit: 10,
      description: 'Gasto no deducible: Test asdasd',
      invoice_id: '' as unknown as number,
      quotation_id: '' as unknown as number,
      expense_id: '',
      project_id: '',
    },
    {
      account_id: '5.02.01.17',
      debit: 10,
      credit: 0,
      description: 'Gasto no deducible: Test asdasd',
      invoice_id: '' as unknown as number,
      quotation_id: '' as unknown as number,
      expense_id: '',
      project_id: '',
    },
  ],
};
