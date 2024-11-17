import {
  DoubleEntryAccounting,
  DoubleEntryAccountingForm,
  DoubleEntryAccountingTransaction,
  ExpandedTransaction,
} from '@src/types/doubleEntryAccounting';

export const expandDoubleEntryAccounting = (
  entries: DoubleEntryAccounting[],
): ExpandedTransaction[] =>
  entries
    .map((entry) =>
      Object.values(entry.transactions).map((transaction, index) => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { transactions, ...formattedEntry } = entry;

        return {
          ...formattedEntry,
          ...transaction,
          id: `${entry.id}:${index}`,
        } satisfies ExpandedTransaction;
      }),
    )
    .flat();

export const convertToForm = (data: DoubleEntryAccounting): DoubleEntryAccountingForm =>
  ({
    ...data,
    transactions: Object.values(data.transactions),
  });

export const convertFromForm = (data: DoubleEntryAccountingForm): DoubleEntryAccounting => {
  const transactions: Record<string, DoubleEntryAccountingTransaction> = {};

  data.transactions.forEach((transaction, index) => {
    const { accountId } = transaction;
    transactions[accountId] = transaction;
  });

  return { ...data, transactions };
};

