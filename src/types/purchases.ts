import {
  CustomsPaymentSchema,
  NonDeductibleSchema,
  PaymentSchema,
  PurchaseSchema,
  ReceivedInvoiceSchema,
  SaleNoteSchema,
} from '@src/lib/schemas/purchases';
import { z } from 'zod';

export type ReceivedInvoice = z.infer<typeof ReceivedInvoiceSchema>;
export type CustomsPayment = z.infer<typeof CustomsPaymentSchema>;
export type NonDeductible = z.infer<typeof NonDeductibleSchema>;
export type SaleNote = z.infer<typeof SaleNoteSchema>;
export type Payment = z.infer<typeof PaymentSchema>;
export type Purchase = z.infer<typeof PurchaseSchema>;
