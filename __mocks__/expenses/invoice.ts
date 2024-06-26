import { ExtendedInvoice } from '@src/types/expenses';

export const _sourceInvoice: ExtendedInvoice = {
  id: '',
  emission_point: 1,
  establishment: 1,
  sequential_number: 1,
  issuer_id: '1234567890',
  issuer_name: 'Test',
  tax_exempted_subtotal: 10,
  taxed_subtotal: 10,
  issue_date: new Date('2024-04-02T20:42:31.655Z'),
  type: 'invoice',
  day_book_transaction_id: '',
  IVA: 1.5,
  description: 'asdasd',
  project_id: '',
  total: 21.5,
  transaction_details: [
    {
      account_id: '1.01.01.03.01',
      debit: 0,
      credit: 0,
      description: '',
    },
    {
      account_id: '5.01.01.02',
      debit: 0,
      credit: 0,
      description: '',
    },
    {
      account_id: '',
      debit: 0,
      credit: 0,
      description: '',
    },
  ],
};

export const _processedInvoice: ExtendedInvoice = {
  id: '',
  emission_point: 1,
  establishment: 1,
  sequential_number: 1,
  issuer_id: '1234567890',
  issuer_name: 'Test',
  tax_exempted_subtotal: 10,
  taxed_subtotal: 10,
  issue_date: new Date('2024-04-02T20:42:31.655Z'),
  type: 'invoice',
  day_book_transaction_id: '',
  IVA: 1.5,
  description: 'asdasd',
  project_id: '',
  total: 21.5,
  transaction_details: [
    {
      account_id: '1.01.01.03.01',
      debit: 0,
      credit: 21.5,
      description: 'Factura recibida: 1234567890-asdasd',
    },
    {
      account_id: '5.01.01.02',
      debit: 20,
      credit: 0,
      description: 'Factura recibida: 1234567890-asdasd',
    },
    {
      account_id: '1.01.05.01',
      debit: 1.5,
      credit: 0,
      description: 'Factura recibida: 1234567890-asdasd',
    },
  ],
};
