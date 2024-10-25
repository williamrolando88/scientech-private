import { z } from 'zod';
import { DocumentRefSchema } from './documentRef';

const Transaction = z.object({
  accountId: z.string(),
  credit: z.number(),
  debit: z.number(),
});

export const DoubleEntryAccountingSchema = z.object({
  id: z.string().optional(),
  issueDate: z.coerce.date(),
  description: z.string(),
  ref: DocumentRefSchema,
  transactions: Transaction.array(),
  locked: z.boolean().default(false),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
});