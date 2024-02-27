import { z } from 'zod';
import { CI_RUC_REGEX } from '../constants/regex';

const ClientContactParser = z.object({
  name: z.string(),
  email: z.string().email(),
  phone: z.string(),
  role: z.string(),
});

export const ClientParser = z.object({
  id: z.string().regex(CI_RUC_REGEX),
  name: z.string(),
  address: z.string(),
  contact: ClientContactParser.array(),
  phone: z.string().optional(),
  email: z.string().email().optional(),
});
