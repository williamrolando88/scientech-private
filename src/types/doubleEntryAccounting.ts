import { DoubleEntryAccountingSchema, TransactionSchema } from '@src/lib/schemas/doubleEntryAccounting';
import { z } from 'zod';

export type DoubleEntryAccountingTransaction = z.infer<
  typeof TransactionSchema
>;
export type DoubleEntryAccounting = z.infer<typeof DoubleEntryAccountingSchema>;


export type ExpandedTransaction = DoubleEntryAccountingTransaction &
  Omit<DoubleEntryAccounting, 'transactions'>;
