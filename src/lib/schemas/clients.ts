import { z } from 'zod';
import { ZOD_ERROR } from '../constants/errors';
import { CI_RUC_REGEX } from '../constants/regex';

export const ClientContactSchema = z.object({
  name: z.string(ZOD_ERROR.REQUIRED),
  email: z.string(ZOD_ERROR.REQUIRED).email(),
  phone: z.string(ZOD_ERROR.REQUIRED),
  role: z.string(ZOD_ERROR.REQUIRED),
});

export const ClientSchema = z.object({
  id: z.string(ZOD_ERROR.REQUIRED).regex(CI_RUC_REGEX, ZOD_ERROR.CI_RUC),
  name: z.string(ZOD_ERROR.REQUIRED),
  address: z.string().optional(),
  contact: ClientContactSchema.array(),
  phone: z.string().optional(),
  email: z.string().email().optional(),
});
