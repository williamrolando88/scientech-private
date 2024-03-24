import {
  CustomsPaymentSchema,
  ExpenseTypeSchema,
  ExpensesCommonSchema,
  InvoiceSchema,
} from '@src/lib/schemas/expenses';
import { z } from 'zod';
import { DayBookTransactionDetail } from './dayBook';

type TransactionDetails = {
  transaction_details: DayBookTransactionDetail[];
};

export type Expense = z.infer<typeof ExpensesCommonSchema>;
export type ExtendedExpense = Expense & TransactionDetails;

export type CustomsPayment = z.infer<typeof CustomsPaymentSchema>;
export type ExtendedCustomsPayment = CustomsPayment & TransactionDetails;

export type Invoice = z.infer<typeof InvoiceSchema>;
export type ExtendedInvoice = Invoice & TransactionDetails;

export type GeneralExpense = Expense | CustomsPayment | Invoice;

export type ExtendedGeneralExpense = (Expense | CustomsPayment | Invoice) &
  TransactionDetails;

export type ExpenseType = z.infer<typeof ExpenseTypeSchema>;

export type AddReceivedInvoiceProps = {
  onClose: VoidFunction;
};
