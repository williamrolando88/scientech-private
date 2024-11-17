import { z } from 'zod';
import { DocumentRefSchema } from './documentRef';

export const TransactionSchema = z.object({
  accountId: z.string(),
  credit: z.number().default(0),
  debit: z.number().default(0),
});

export const DoubleEntryAccountingSchema = z.object({
  id: z.string().optional(),
  issueDate: z.coerce.date(),
  description: z.string(),
  ref: DocumentRefSchema,
  transactions: z.record(z.string(), TransactionSchema),
  locked: z.boolean().default(false),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
});

export const DoubleEntryAccountingFormSchema = DoubleEntryAccountingSchema.extend({
  transactions: TransactionSchema.array(),
});