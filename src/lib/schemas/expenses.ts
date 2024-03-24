import { z } from 'zod';
import { ZOD_ERROR } from '../constants/errors';
import { CI_RUC_REGEX } from '../constants/regex';

const ExpenseTypeValues = [
  'invoice',
  'customs_payment',
  'sale_note',
  'non_deductible',
] as const;

export const ExpenseTypeSchema = z.enum(ExpenseTypeValues);

export const ExpensesCommonSchema = z.object({
  id: z.string().optional(),
  issuer_date: z.coerce.date(),
  type: ExpenseTypeSchema,
  issuer_name: z.string().optional(),
  day_book_transaction_id: z.string().optional(),
  IVA: z.number().optional(),
  tax_exempted_subtotal: z.number().optional(),
  taxed_subtotal: z.number().optional(),
  description: z.string().optional(),
  project_id: z.string().optional(),
  total: z.number().optional(),
});

export const CustomsPaymentSchema = ExpensesCommonSchema.extend({
  adValorem_tariff: z.number().optional(),
  specific_tariff: z.number().optional(),
  tariff: z.number(),
  type: z.literal('customs_payment'),
});

export const InvoiceSchema = ExpensesCommonSchema.extend({
  issuer_id: z.string(ZOD_ERROR.REQUIRED).regex(CI_RUC_REGEX, ZOD_ERROR.CI_RUC),
  type: z.literal('invoice'),
  establishment: z.number(),
  emission_point: z.number(),
  sequential_number: z.number(),
});
