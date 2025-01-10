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

export const createBalanceTreeDict = (data: FlattedTransaction[]) => {
  const balanceDict: Record<string, number> = {};

  data.forEach((element) => {
    if (!element.value) return;

    const accountDirections = element.account.split('.');
    accountDirections.forEach((_, i, dir) => {
      const path = dir.slice(0, i + 1).join('.');
      if (balanceDict[path]) {
        balanceDict[path] = round(balanceDict[path] + element.value, 2);
      } else {
        balanceDict[path] = element.value;
      }
    });
  });

  return balanceDict;
};

export const balanceCalculator = (
  data: DoubleEntryAccounting[]
): Record<string, number> => {
  if (!data.length) return {};

  const transactions = getValuesByAccount(data);
  const totals = calculateFlattedTotal(transactions);
  return createBalanceTreeDict(totals);
};

export const calculateProfit = (data: DoubleEntryAccounting[]) => {
  const balanceTree = balanceCalculator(data);
  return round(balanceTree['4'] - balanceTree['5'], 2);
};
