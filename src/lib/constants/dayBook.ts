import {
  DayBookTransaction,
  DayBookTransactionDetail,
} from 'src/types/dayBook';

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
  id: '',
  date: new Date(),
  transactions: new Array(2).fill(DAYBOOK_TRANSACTION_DETAIL_INITIAL_VALUE),
};