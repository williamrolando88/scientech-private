import { z } from 'zod';

export const DayBookTransactionParser = z.object({
  account_id: z.string(),
  debit: z.number().optional(),
  credit: z.number().optional(),
  description: z.string().optional(),
  invoice_id: z.number().optional(),
  quotation_id: z.number().optional(),
});

export const DayBookParser = z.object({
  date: z.number(),
  transaction: DayBookTransactionParser.array(),
});
