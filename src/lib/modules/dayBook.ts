import { round } from 'mathjs';
import { AccountCategoryDict, AccountTree } from 'src/types/accountCategories';
import { DayBookTableEntry, DayBookTransaction } from 'src/types/dayBook';

export const dayBookTransactionsValidator = (
  entry: DayBookTransaction
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

  const hasEmptyDescriptions = entry.transactions.some(
    (transaction) =>
      !transaction.description &&
      !transaction.invoice_id &&
      !transaction.quotation_id
  );

  if (hasEmptyDescriptions) {
    return 'Toda transacción debe tener al menos una descripción, factura o cotización';
  }

  const totalDebit = entry.transactions.reduce(
    (acc, curr) => acc + curr.debit! ?? 0,
    0
  );

  const totalCredit = entry.transactions.reduce(
    (acc, curr) => acc + curr.credit! ?? 0,
    0
  );

  if (round(totalDebit, 2) !== round(totalCredit, 2)) {
    return 'La transacción no está balanceada';
  }

  return null;
};

export const getTransactionDataByDetailId = (
  detailId: string,
  transactions: DayBookTransaction[]
): DayBookTransaction | null => {
  const [transactionId] = detailId.split(':');
  const transaction = transactions?.find((entry) => entry.id === transactionId);

  return transaction || null;
};

export const getInputColorById = (accountId: string) => {
  const [root] = accountId.split('.');

  if (['1', '5'].includes(root)) {
    return 'text-green-500';
  }

  if (root === '2') {
    return 'text-red-500';
  }

  if (root === '3') {
    return 'text-blue-500';
  }

  return 'text-gray-500';
};

export const getDayBookTransactions = (
  transactions: DayBookTransaction[]
): DayBookTableEntry[] => {
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

export const getPositiveValueByAccount = (detail: DayBookTableEntry) => {
  const { account_id, credit, debit } = detail;

  const roundedCredit = round(credit || 0, 2);
  const roundedDebit = round(debit || 0, 2);

  if (['1', '5'].includes(account_id[0])) {
    return roundedDebit - roundedCredit;
  }
  return roundedCredit - roundedDebit;
};

export const getIncrementByAccount = (detail: DayBookTableEntry) =>
  (['1', '5'].includes(detail.account_id[0]) ? detail.debit : detail.credit) ||
  0;

export const getDecrementByAccount = (detail: DayBookTableEntry) =>
  (['1', '5'].includes(detail.account_id[0]) ? detail.credit : detail.debit) ||
  0;

export const createAccountsTree = (
  accounts: AccountCategoryDict
): AccountTree[] => {
  const tree: AccountTree[] = [];

  Object.values(accounts).forEach((account) => {
    const [root, ...rest] = account.id.split('.');

    if (rest.length === 0) {
      tree.push({
        id: account.id,
        name: account.name,
        children: [],
      });
    } else {
      const parent = tree.find((node) => node.id === root);

      if (parent) {
        parent.children.push({
          id: account.id,
          name: account.name,
          children: [],
        });
      }
    }
  });

  return tree;
};
