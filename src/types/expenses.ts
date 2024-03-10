import {
  CustomsPaymentParser,
  ExpensesCommonParser,
  InvoiceParser,
} from '@src/lib/parsers/expenses';
import { z } from 'zod';

export type Expense = z.infer<typeof ExpensesCommonParser>;

export type CustomsPayment = z.infer<typeof CustomsPaymentParser>;

export type Invoice = z.infer<typeof InvoiceParser>;

export type GeneralExpense = Expense | CustomsPayment | Invoice;
