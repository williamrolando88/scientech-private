import { ReportFormValidationSchema } from '@src/lib/schemas/reports';
import { z } from 'zod';

export type ReportForm = z.infer<typeof ReportFormValidationSchema>;
