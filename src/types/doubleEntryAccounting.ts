import {
  DoubleEntryAccountingFormSchema,
  DoubleEntryAccountingSchema,
  TransactionSchema,
} from '@src/lib/schemas/doubleEntryAccounting';
import { z } from 'zod';

export type DoubleEntryAccountingTransaction = z.infer<
  typeof TransactionSchema
>;
export type DoubleEntryAccounting = z.infer<typeof DoubleEntryAccountingSchema>;
export type DoubleEntryAccountingForm = z.infer<typeof DoubleEntryAccountingFormSchema>;

export type ExpandedTransaction = DoubleEntryAccountingTransaction &
  Omit<DoubleEntryAccounting, 'transactions'>;
