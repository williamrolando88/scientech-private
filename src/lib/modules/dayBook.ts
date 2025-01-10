import {
  DoubleEntryAccounting,
  DoubleEntryAccountingTransaction,
  ExpandedTransaction,
} from '@src/types/doubleEntryAccounting';
import { round } from 'mathjs';
import { DayBookTableEntryOld, DayBookTransactionOld } from 'src/types/dayBook';

export const dayBookTransactionsValidator = (
  entry: DoubleEntryAccounting
): string | null => {
  if (entry.transactions.length < 2) {
    return 'La transacción debe tener al menos dos movimientos';
  }

  const hasEmptyentry = entry.transactions.some(
    (transaction) => !transaction.debit && !transaction.credit
  );

  if (hasEmptyentry) {
    return 'Toda transacción debe tener al menos un movimiento en "DEBE" o "HABER"';
  }

  const hasBothValues = entry.transactions.some(
    (transaction) => transaction.debit && transaction.credit
  );

  if (hasBothValues) {
    return 'Toda transacción solo puede tener un movimiento en "DEBE" o "HABER"';
  }

  const totalDebit = entry.transactions.reduce(
    (acc, curr) => acc + curr.debit,
    0
  );

  const totalCredit = entry.transactions.reduce(
    (acc, curr) => acc + curr.credit,
    0
  );

  if (round(totalDebit, 2) !== round(totalCredit, 2)) {
    return 'La transacción no está balanceada';
  }

  return null;
};

export const getTransactionDataByDetailId = (
  detailId: string,
  transactions: DoubleEntryAccounting[]
): DoubleEntryAccounting | null => {
  const [transactionId] = detailId.split(':');
  const transaction = transactions?.find((entry) => entry.id === transactionId);

  return transaction || null;
};

export const checkDebitIncrement = (accountId: string) => {
  const [root] = accountId.split('.');

  return ['1', '5'].includes(root);
};

export const expandDoubleEntryAccountTransaction = (
  transactions: DayBookTransactionOld[]
): DayBookTableEntryOld[] => {
  if (!transactions) return [];

  return transactions
    .map((entry) =>
      (entry.transactions || []).map((detail, index) => ({
        ...detail,
        id: `${entry.id}:${index}`,
        date: entry.date,
        locked: entry.locked,
      }))
    )
    .flat();
};

export const getDayBookTransactions = (
  transactions: DayBookTransactionOld[]
): DayBookTableEntryOld[] => {
  if (!transactions) return [];

  return transactions
    .map((entry) =>
      (entry.transactions || []).map((detail, index) => ({
        ...detail,
        id: `${entry.id}:${index}`,
        date: entry.date,
        locked: entry.locked,
      }))
    )
    .flat();
};

export const getPositiveValueByAccount = (
  detail: DoubleEntryAccountingTransaction
) => {
  const { accountId, credit, debit } = detail;

  const roundedCredit = round(credit || 0, 2);
  const roundedDebit = round(debit || 0, 2);

  if (checkDebitIncrement(accountId)) {
    return roundedDebit - roundedCredit;
  }
  return roundedCredit - roundedDebit;
};

export const getIncrementByAccount = (detail: ExpandedTransaction) =>
  checkDebitIncrement(detail.accountId) ? detail.debit : detail.credit;

export const getDecrementByAccount = (detail: ExpandedTransaction) =>
  checkDebitIncrement(detail.accountId) ? detail.credit : detail.debit;
