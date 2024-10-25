import { CustomsPaymentSchema } from '@src/lib/schemas/expenses/customsPayment';
import { InvoiceSchema } from '@src/lib/schemas/expenses/invoice';
import { NonDeductibleSchema } from '@src/lib/schemas/expenses/nonDeductible';
import { SaleNoteSchema } from '@src/lib/schemas/expenses/saleNote';
import { z } from 'zod';

export type Invoice = z.infer<typeof InvoiceSchema>;
export type CustomsPayment = z.infer<typeof CustomsPaymentSchema>;
export type NonDeductible = z.infer<typeof NonDeductibleSchema>;
export type SaleNote = z.infer<typeof SaleNoteSchema>;