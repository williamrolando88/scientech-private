import { z } from 'zod';
import { ZOD_ERROR } from '../constants/errors';
import { ACCOUNT_CATEGORY_REGEX } from '../constants/regex';

export const AccountCategoryParser = z.object({
  id: z
    .string(ZOD_ERROR.REQUIRED)
    .regex(ACCOUNT_CATEGORY_REGEX, ZOD_ERROR.ACCOUNT_CATEGORY_ID),
  name: z.string(ZOD_ERROR.REQUIRED),
  editable: z.boolean(),
  description: z.string().optional(),
});
