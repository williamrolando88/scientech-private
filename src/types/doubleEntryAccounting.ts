import { DoubleEntryAccountingSchema } from '@src/lib/schemas/doubleEntryAccounting';
import { z } from 'zod';

export type DoubleEntryAccounting = z.infer<typeof DoubleEntryAccountingSchema>;
