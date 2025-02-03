import { ZOD_ERROR } from '@src/lib/constants/errors';
import { CI_RUC_REGEX } from '@src/lib/constants/regex';
import { z } from 'zod';
import { DocumentRefSchema } from './documentRef';

export const ReceivedInvoiceSchema = z.object({
  id: z.string().optional(),
  paid: z.boolean().default(false),
  issueDate: z.coerce.date(),
  issuerName: z.string(),
  issuerId: z.string(ZOD_ERROR.REQUIRED).regex(CI_RUC_REGEX, ZOD_ERROR.CI_RUC),
  establishment: z.coerce.number().positive(),
  emissionPoint: z.coerce.number().positive(),
  sequentialNumber: z.coerce.number().positive(),
  description: z.string(),
  IVA: z.number().optional(),
  noTaxSubtotal: z.number(),
  taxedSubtotal: z.number(),
  total: z.number().positive(),
  ref: DocumentRefSchema,
  expenseAccount: z.string(),
  locked: z.boolean().default(false),
});

export const SaleNoteSchema = z.object({
  id: z.string().optional(),
  paid: z.boolean().default(false),
  issueDate: z.coerce.date(),
  issuerName: z.string(),
  issuerId: z.string().regex(CI_RUC_REGEX, ZOD_ERROR.CI_RUC),
  establishment: z.coerce.number().positive().optional(),
  emissionPoint: z.coerce.number().positive().optional(),
  sequentialNumber: z.coerce.number().positive().optional(),
  description: z.string(),
  total: z.number().positive(),
  ref: DocumentRefSchema,
  expenseAccount: z.string(),
});

export const NonDeductibleSchema = z.object({
  id: z.string().optional(),
  paid: z.boolean().default(false),
  issueDate: z.coerce.date(),
  issuerName: z.string(),
  description: z.string(),
  total: z.number().positive(),
  ref: DocumentRefSchema,
  expenseAccount: z.string(),
});

export const CustomsPaymentSchema = z.object({
  id: z.string().optional(),
  paid: z.boolean().default(false),
  issueDate: z.coerce.date(),
  customsPaymentNumber: z.coerce.string(),
  description: z.string(),
  IVA: z.number().positive(),
  FODINFA: z.number().positive(),
  adValoremTariff: z.number().nonnegative(),
  specificTariff: z.number().nonnegative(),
  total: z.number().positive(),
  ref: DocumentRefSchema,
});

export const PaymentSchema = z.object({
  id: z.string(),
  paymentAccount: z.string(),
  amount: z.number(),
  paymentDate: z.coerce.date(),
  ref: DocumentRefSchema,
});

const BaseSchema = z.object({
  id: z.string().optional(),
  payment: PaymentSchema.nullish(),
});

export const PurchaseSchema = z.discriminatedUnion('type', [
  BaseSchema.extend({
    purchaseData: ReceivedInvoiceSchema,
    type: z.literal('receivedInvoice'),
  }),
  BaseSchema.extend({
    purchaseData: CustomsPaymentSchema,
    type: z.literal('customsPayment'),
  }),
  BaseSchema.extend({
    purchaseData: SaleNoteSchema,
    type: z.literal('saleNote'),
  }),
  BaseSchema.extend({
    purchaseData: NonDeductibleSchema,
    type: z.literal('nonDeductible'),
  }),
]);
