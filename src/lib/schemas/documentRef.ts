import { z } from 'zod';

export const DocumentRefSchema = z.record(z.string(), z.string());
