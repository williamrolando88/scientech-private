import {
  CustomsPaymentSchema,
  ExpenseTypeSchema,
  ExpensesCommonSchema,
  InvoiceSchema,
} from '@src/lib/schemas/expenses';
import { z } from 'zod';

export type Expense = z.infer<typeof ExpensesCommonSchema>;

export type CustomsPayment = z.infer<typeof CustomsPaymentSchema>;

export type Invoice = z.infer<typeof InvoiceSchema>;

export type GeneralExpense = Expense | CustomsPayment | Invoice;

export type ExpenseType = z.infer<typeof ExpenseTypeSchema>;

export type AddReceivedInvoiceProps = {
  onClose: VoidFunction;
};
