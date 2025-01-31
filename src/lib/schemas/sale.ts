import { z } from 'zod';
import { ZOD_ERROR } from '../constants/errors';
import { CI_RUC_REGEX } from '../constants/regex';
import { DocumentRefSchema } from './documentRef';

export const BillingDocumentSchema = z.object({
  id: z.string().optional(),
  issueDate: z.coerce.date(),
  recipientName: z.string().trim(),
  recipientId: z
    .string(ZOD_ERROR.REQUIRED)
    .regex(CI_RUC_REGEX, ZOD_ERROR.CI_RUC),
  establishment: z.coerce.number().positive(),
  emissionPoint: z.coerce.number().positive(),
  sequentialNumber: z.coerce.number().positive(),
  description: z.string().trim(),
  IVA: z.number().positive(),
  taxedSubtotal: z.number().positive(),
  total: z.number().positive(),
  ref: DocumentRefSchema.optional(),
  saleAccount: z.string(),
  paid: z.boolean().default(false),
});

export const WithholdingSchema = z.object({
  id: z.string(),
  issueDate: z.coerce.date(),
  issuerName: z.string().trim(),
  issuerId: z.string(ZOD_ERROR.REQUIRED).regex(CI_RUC_REGEX, ZOD_ERROR.CI_RUC),
  establishment: z.coerce.number().positive(),
  emissionPoint: z.coerce.number().positive(),
  sequentialNumber: z.coerce.number().positive(),
  IVAWithholding: z.number().nonnegative().optional(),
  IncomeWithholding: z.number().nonnegative().optional(),
  total: z.number().positive(),
  ref: DocumentRefSchema.optional(),
  unlocked: z.boolean().default(false),
});

export const PaymentCollectionSchema = z.object({
  id: z.string(),
  amount: z.number(),
  paymentDate: z.coerce.date(),
  paymentAccount: z.string(),
  advancePaymentAmount: z.number(),
  ref: DocumentRefSchema,
});

export const SaleSchema = z.object({
  id: z.string().optional(),
  billingDocument: BillingDocumentSchema,
  withholding: WithholdingSchema.nullish(),
  paymentCollection: PaymentCollectionSchema.nullish(),
  paymentDue: z.number().nonnegative(),
});
