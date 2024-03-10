import { z } from 'zod';

export const ProjectStatusValues = ['active', 'inactive', 'completed'] as const;
export const EventActionValues = [
  'created',
  'updated',
  'activated',
  'deactivated',
] as const;

const ProjectStatusParser = z.enum(ProjectStatusValues);
const EventActionParser = z.enum(EventActionValues);

export const EventParser = z.object({
  user_id: z.string(),
  action: EventActionParser,
  date: z.coerce.date(),
});

export const ProjectParser = z.object({
  id: z.string().max(15).optional(),
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
