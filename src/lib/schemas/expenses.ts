import { z } from 'zod';

const ExpenseTypeValues = [
  'Factura',
  'Liquidación aduanera',
  'Nota de venta',
  'No deducible',
] as const;

const ExpenseTypeSchema = z.enum(ExpenseTypeValues);

export const ExpensesCommonSchema = z.object({
  id: z.string().optional(),
  issuer_name: z.string(),
  issuer_date: z.coerce.date(),
  type: ExpenseTypeSchema,
  day_book_transaction_id: z.string().optional(),
  IVA: z.number().optional(),
  tax_exempted_subtotal: z.number().optional(),
  taxed_subtotal: z.number().optional(),
  description: z.string().optional(),
  project_id: z.string().optional(),
});

export const CustomsPaymentSchema = ExpensesCommonSchema.extend({
  adValorem_tariff: z.number().optional(),
  specific_tariff: z.number().optional(),
  tariff: z.number(),
  type: z.literal('Liquidación aduanera'),
});

export const InvoiceSchema = ExpensesCommonSchema.extend({
  issuer_id: z.string(),
  type: z.literal('Factura'),
});
