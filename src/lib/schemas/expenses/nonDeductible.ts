import { z } from 'zod';
import { DocumentRefSchema } from '../documentRef';

export const NonDeductibleSchema = z.object({
  id: z.string().optional(),
  paid: z.boolean().default(false),
  issueDate: z.coerce.date(),
  issuerName: z.string(),
  description: z.string(),
  total: z.number().positive(),
  ref: DocumentRefSchema,
});
