import { DoubleEntryAccounting } from '@src/types/doubleEntryAccounting';
import { round } from 'mathjs';
import { getPositiveValueByAccount } from './dayBook';

type FlattedTransaction = {
  account: string;
  value: number;
};

export const getValuesByAccount = (
  entries: DoubleEntryAccounting[]
): FlattedTransaction[] => {
  const transactionsArray = entries.map((e) => e.transactions).flat();

  const transactionValues = transactionsArray.map((t) => ({
    account: t.accountId,
    value: getPositiveValueByAccount(t),
  }));

  return transactionValues.sort((a, b) => a.account.localeCompare(b.account));
};

export const calculateFlattedTotal = (
  data: FlattedTransaction[]
): FlattedTransaction[] => {
  const flattedTotals: Record<string, FlattedTransaction> = {};

  data.forEach((entry) => {
    const { account, value } = entry;

    if (flattedTotals[account]) {
      flattedTotals[account] = {
        ...flattedTotals[account],
        value: round(flattedTotals[account].value + value, 2),
      };
    } else {
      flattedTotals[account] = entry;
    }
  });

  return Object.values(flattedTotals);
};

type TreeBranch = {
  account: string;
  value: number;
  children: TreeBranch;
};

type BalanceTree = Record<string, TreeBranch>;

export const createBalanceTree = (data: FlattedTransaction[]): BalanceTree => {
  const tree: BalanceTree = {};

  const firstElement = data[0];
  const accountDirections = firstElement.account.split('.');
  accountDirections.forEach((_, i, dir) => {
    const path = dir.slice(0, i + 1).join('.');

    console.log(path);
  });

  return tree;
};
