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
  { name: 'account_id', value: 6 },
  { name: 'debit', value: 3 },
  { name: 'credit', value: 3 },
  { name: 'description', value: 6 },
  { name: 'invoice_id', value: 3 },
  { name: 'quotation_id', value: 3 },
  { name: 'action', value: 2 },
];
