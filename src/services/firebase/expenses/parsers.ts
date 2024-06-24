import { ExpenseTypeValues } from '@src/types/expenses';
import { ZodSchema } from 'zod';
import {
  CustomsPaymentSchema,
  ExpensesCommonSchema,
  InvoiceSchema,
} from '@src/lib/schemas/expenses';

export const ExpenseParserByType: Record<ExpenseTypeValues, ZodSchema> = {
  invoice: InvoiceSchema,
  customs_payment: CustomsPaymentSchema,
  non_deductible: ExpensesCommonSchema,
  sale_note: ExpensesCommonSchema,
};
