import { z } from 'zod';

export const DayBookTransactionDetailsParser = z.object({
  account_id: z.string(),
  debit: z.number().optional(),
  credit: z.number().optional(),
  description: z.string().optional(),
  project_id: z.string().optional(),
  expense_id: z.string().optional(),
  /**
   * @deprecated
   */
  quotation_id: z.number().optional(),
  /**
   * @deprecated
   */
  invoice_id: z.number().optional(),
});

export const DayBookTransactionParser = z.object({
  id: z.string().optional(),
  date: z.coerce.date(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  locked: z.boolean().nullish(),
  transactions: DayBookTransactionDetailsParser.array(),
});
