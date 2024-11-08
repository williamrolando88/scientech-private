import { z } from 'zod';

export const ProjectStatusValues = ['active', 'inactive', 'completed'] as const;

const ProjectStatusSchema = z.enum(ProjectStatusValues);

export const ProjectSchema = z.object({
  id: z.string().optional(),
  name: z.string(),
  description: z.string().optional(),
  status: ProjectStatusSchema,
  client_id: z.string(),
  start_date: z.coerce.date(),
  end_date: z.coerce.date(),
});
