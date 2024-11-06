import { z } from 'zod';

export const DocumentRefSchema = z.object({ projectId: z.string() }).partial();
