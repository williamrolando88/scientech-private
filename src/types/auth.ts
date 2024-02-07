import { LoginParser } from 'src/lib/parsers/auth';
import { z } from 'zod';

export type LoginForm = z.infer<typeof LoginParser>;
