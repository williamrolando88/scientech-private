import { z } from 'zod';
import { ZOD_ERROR } from '../constants/errors';

export const LoginParser = z.object({
  email: z.string(ZOD_ERROR.REQUIRED).email(),
  password: z.string(ZOD_ERROR.REQUIRED),
});
