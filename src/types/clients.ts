import { ClientContactSchema, ClientSchema } from '@src/lib/schemas/clients';
import { z } from 'zod';

export type Client = z.infer<typeof ClientSchema>;

export type ClientContact = z.infer<typeof ClientContactSchema>;
