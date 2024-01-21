import { z } from 'zod';

export const DayBookTransactionDetailsParser = z.object({
  account_id: z.string(),
  debit: z.number().optional(),
  credit: z.number().optional(),
  description: z.string().optional(),
  invoice_id: z.number().optional(),
  quotation_id: z.number().optional(),
});

export const DayBookTransactionParser = z.object({
  id: z.string().optional(),
  date: z.coerce.date(),
  transactions: DayBookTransactionDetailsParser.array(),
});
