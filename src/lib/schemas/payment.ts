import { z } from 'zod';
import { DocumentRefSchema } from './documentRef';

export const PaymentSchema = z.object({
  id: z.string().optional(),
  paymentAccount: z.string(),
  amount: z.number(),
  createdAt: z.coerce.date(),
  ref: DocumentRefSchema,
});
