import { z } from 'zod';

export const LoginParser = z.object({
  email: z.string().email(),
  password: z.string(),
});
