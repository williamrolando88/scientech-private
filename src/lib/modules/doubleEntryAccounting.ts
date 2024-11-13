import {
  DoubleEntryAccounting,
  ExpandedTransaction,
} from '@src/types/doubleEntryAccounting';

export const expandDoubleEntryAccounting = (
  entries: DoubleEntryAccounting[]
): ExpandedTransaction[] =>
  entries
    .map((entry) =>
      entry.transactions.map((transaction, index) => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { transactions, ...formattedEntry } = entry;

        return {
          ...formattedEntry,
          ...transaction,
          id: `${entry.id}:${index}`,
        } satisfies ExpandedTransaction;
      })
    )
    .flat();
