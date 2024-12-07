import { ZOD_ERROR } from '@src/lib/constants/errors';
import { CI_RUC_REGEX } from '@src/lib/constants/regex';
import { z } from 'zod';
import { DocumentRefSchema } from '../documentRef';

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
