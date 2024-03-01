import { z } from 'zod';

export const ProjectStatusValues = ['active', 'inactive', 'completed'] as const;

export const ProjectStatusParser = z.enum(ProjectStatusValues);

export const EventParser = z.object({
  id: z.string(),
  user_id: z.string(),
  message: z.string(),
  created_at: z.coerce.date(),
});

export const ProjectParser = z.object({
  id: z.number().optional(),
  name: z.string(),
  description: z.string(),
  status: ProjectStatusParser,
  client_id: z.string(),
  start_date: z.coerce.date(),
  end_date: z.coerce.date(),
  events: EventParser.array(),
  custom_payments_id: z.string().array(),
  issued_quotations_id: z.string().array(),
  issued_invoices_id: z.string().array(),
  received_invoices_id: z.string().array(),
});
