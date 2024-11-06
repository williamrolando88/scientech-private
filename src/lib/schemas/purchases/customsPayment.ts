import { z } from 'zod';
import { DocumentRefSchema } from '../documentRef';

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
