import { ProjectSchema } from '@src/lib/schemas/projects';
import { z } from 'zod';

export type Project = z.infer<typeof ProjectSchema>;
