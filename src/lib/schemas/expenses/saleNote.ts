import { ZOD_ERROR } from '@src/lib/constants/errors';
import { CI_RUC_REGEX } from '@src/lib/constants/regex';
import { z } from 'zod';
import { DocumentRefSchema } from '../documentRef';

export const SaleNoteSchema = z.object({
  id: z.string().optional(),
  issueDate: z.coerce.date(),
  issuerName: z.string(),
  issuerId: z.string().regex(CI_RUC_REGEX, ZOD_ERROR.CI_RUC),
  establishment: z.coerce.number().positive(),
  emissionPoint: z.coerce.number().positive(),
  sequentialNumber: z.coerce.number().positive(),
  description: z.string(),
  total: z.number().positive(),
  ref: DocumentRefSchema,
});
