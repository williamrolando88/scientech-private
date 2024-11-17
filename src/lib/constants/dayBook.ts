import { DoubleEntryAccounting, DoubleEntryAccountingTransaction } from '@src/types/doubleEntryAccounting';

export const DAYBOOK_TRANSACTION_DETAIL_INITIAL_VALUE: DoubleEntryAccountingTransaction =
  {
    accountId: '',
    debit: 0,
    credit: 0,
  };

export const DAYBOOK_TRANSACTION_INITIAL_VALUE: DoubleEntryAccounting = {
  issueDate: new Date(),
  createdAt: new Date(),
  updatedAt: new Date(),
  locked: false,
  description: '',
  ref: {},
  id: '',
  transactions: {
    '1': DAYBOOK_TRANSACTION_DETAIL_INITIAL_VALUE,
    '2': DAYBOOK_TRANSACTION_DETAIL_INITIAL_VALUE,
  },
};

export const DAYBOOK_FORM_GRID_LAYOUT = [
  { name: 'accountId', value: 6 },
  { name: 'debit', value: 2 },
  { name: 'credit', value: 2 },
  { name: 'action', value: 1 },
];
