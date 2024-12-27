import {
  DoubleEntryAccounting,
  DoubleEntryAccountingTransaction,
} from '@src/types/doubleEntryAccounting';

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
  transactions: new Array(2).fill(DAYBOOK_TRANSACTION_DETAIL_INITIAL_VALUE),
  accounts: [],
};

export const DAYBOOK_FORM_GRID_LAYOUT = [
  { name: 'accountId', value: 10 },
  { name: 'debit', value: 2 },
  { name: 'credit', value: 2 },
  { name: 'action', value: 1 },
];
