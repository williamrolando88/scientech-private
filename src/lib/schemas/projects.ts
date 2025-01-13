import { z } from 'zod';
import { DocumentRefSchema } from './documentRef';

export const ProjectStatusValues = ['active', 'completed'] as const;

const ProjectStatusSchema = z.enum(ProjectStatusValues);

const ProjectClientDetails = z.object({
  name: z.string(),
});

export const ProjectSchema = z.object({
  id: z.string().optional(),
  number: z.number(),
  client: ProjectClientDetails,
  status: ProjectStatusSchema,
  description: z.string().optional(),
  startedAt: z.coerce.date(),
  estimateFinishDate: z.coerce.date(),
  finishedAt: z.coerce.date().nullish(),
  budget: z.number(),
  profitMargin: z.number(),
  contingency: z.number().nullish(),
  ref: DocumentRefSchema,

  // TODO: Delete deprecated properties
  name: z.string().nullish(),
  client_id: z.string().nullish(),
  start_date: z.coerce.date().nullish(),
  end_date: z.coerce.date().nullish(),
});
