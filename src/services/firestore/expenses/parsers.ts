import { CustomsPaymentSchema, ExpensesCommonSchema, InvoiceSchema } from '@src/lib/schemas/expenses';
import { ExpenseTypeValuesOld } from '@src/types/expenses';
import { ZodSchema } from 'zod';

export const ExpenseParserByType: Record<ExpenseTypeValuesOld, ZodSchema> = {
  invoice: InvoiceSchema,
  customs_payment: CustomsPaymentSchema,
  non_deductible: ExpensesCommonSchema,
  sale_note: ExpensesCommonSchema,
};