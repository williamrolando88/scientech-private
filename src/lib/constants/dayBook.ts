import {
  DayBookTransaction,
  DayBookTransactionDetail,
} from 'src/types/dayBook';
import uuidv4 from '../utils/uuidv4';

export const DAYBOOK_TRANSACTION_DETAIL_INITIAL_VALUE: DayBookTransactionDetail =
  {
    account_id: '',
    debit: 0,
    credit: 0,
    description: '',
    invoice_id: '' as unknown as number,
    quotation_id: '' as unknown as number,
  };

export const DAYBOOK_TRANSACTION_INITIAL_VALUE: DayBookTransaction = {
  id: uuidv4(),
  date: new Date(),
  transactions: new Array(2).fill(DAYBOOK_TRANSACTION_DETAIL_INITIAL_VALUE),
};

export const DAYBOOK_FORM_GRID_LAYOUT = [
  { name: 'account_id', value: 2 },
  { name: 'debit', value: 1 },
  { name: 'credit', value: 1 },
  { name: 'description', value: 2 },
  { name: 'invoice_id', value: 1 },
  { name: 'quotation_id', value: 1 },
  { name: 'action', value: 1 },
];
