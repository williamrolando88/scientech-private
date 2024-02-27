import { ClientParser } from '@src/lib/parsers/clients';
import { z } from 'zod';

export type Client = z.infer<typeof ClientParser>;
