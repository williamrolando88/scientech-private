import {
  CustomsPaymentSchema,
  ExpensesCommonSchema,
  ExpenseTypeSchema,
  InvoiceSchema,
} from '@src/lib/schemas/expenses';
import { z } from 'zod';
import { DayBookTransactionDetailOld } from './dayBook';

/** @deprecated */
type TransactionDetailsOld = {
  transaction_details: DayBookTransactionDetailOld[];
};

/** @deprecated */
export type ExpenseOld = z.infer<typeof ExpensesCommonSchema>;
/** @deprecated */
export type ExtendedExpense = ExpenseOld & TransactionDetailsOld;

/** @deprecated */
export type CustomsPaymentOld = z.infer<typeof CustomsPaymentSchema>;
/** @deprecated */
export type ExtendedCustomsPayment = CustomsPaymentOld & TransactionDetailsOld;

/** @deprecated */
export type InvoiceOld = z.infer<typeof InvoiceSchema>;
/** @deprecated */
export type ExtendedInvoice = InvoiceOld & TransactionDetailsOld;

/** @deprecated */
export type GeneralExpenseOld = ExpenseOld | CustomsPaymentOld | InvoiceOld;

/** @deprecated */
export type ExtendedGeneralExpenseOld = (
  | ExpenseOld
  | CustomsPaymentOld
  | InvoiceOld
  ) &
  TransactionDetailsOld;

/** @deprecated */
export type ExpenseTypeValuesOld = z.infer<typeof ExpenseTypeSchema>;

/** @deprecated */
export type AddReceivedVoucherModalPropsOld = {
  onClose: VoidFunction;
};