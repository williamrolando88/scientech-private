import { ExtendedCustomsPayment } from '@src/types/expenses';

export const _sourceCustomsPayment: ExtendedCustomsPayment = {
  id: '',
  customs_payment_number: '44540573',
  issue_date: new Date('2024-04-02T20:42:31.655Z'),
  type: 'customs_payment',
  day_book_transaction_id: '',
  IVA: 4,
  description: 'asdasd',
  project_id: '',
  ad_valorem_tariff: 1,
  specific_tariff: 2,
  FODINFA: 3,
  total: 10,
  transaction_details: [
    {
      account_id: '2.01.04.01.01',
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
    {
      account_id: '',
      debit: 0,
      credit: 0,
      description: '',
    },
  ],
};

export const _processedCustomsPayment: ExtendedCustomsPayment = {
  id: '',
  customs_payment_number: '44540573',
  issue_date: new Date('2024-04-02T20:42:31.655Z'),
  type: 'customs_payment',
  day_book_transaction_id: '',
  IVA: 4,
  description: 'asdasd',
  project_id: '',
  ad_valorem_tariff: 1,
  specific_tariff: 2,
  FODINFA: 3,
  total: 10,
  transaction_details: [
    {
      account_id: '2.01.04.01.01',
      debit: 0,
      credit: 10,
      description: 'Liquidación aduanera: asdasd',
    },
    {
      account_id: '5.02.02.20',
      debit: 6,
      credit: 0,
      description: 'Liquidación aduanera: asdasd',
    },
    {
      account_id: '1.01.05.01',
      debit: 4,
      credit: 0,
      description: 'Liquidación aduanera: asdasd',
    },
  ],
};
