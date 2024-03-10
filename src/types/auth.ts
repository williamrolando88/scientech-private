import { LoginSchema } from '@src/lib/schemas/auth';
import { z } from 'zod';

export type LoginForm = z.infer<typeof LoginSchema>;
