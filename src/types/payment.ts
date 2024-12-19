import { PaymentSchema } from '@src/lib/schemas/payment';
import { z } from 'zod';

export type Payment = z.infer<typeof PaymentSchema>;
