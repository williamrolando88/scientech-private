import { z } from 'zod';
import { ExpenseTypeSchema } from './expenses';

export const ProjectStatusValues = ['active', 'inactive', 'completed'] as const;
export const EventActionValues = [
  'created',
  'updated',
  'activated',
  'deactivated',
] as const;

const ProjectStatusSchema = z.enum(ProjectStatusValues);
const EventActionSchema = z.enum(EventActionValues);

export const EventSchema = z.object({
  user_id: z.string(),
  action: EventActionSchema,
  date: z.coerce.date(),
});

export const ProjectSchema = z.object({
  id: z.string().optional(),
  name: z.string(),
  description: z.string(),
  status: ProjectStatusSchema,
  client_id: z.string(),
  start_date: z.coerce.date(),
  end_date: z.coerce.date(),
  events: EventSchema.array(),
  custom_payments_id: z.string().array(),
  issued_quotations_id: z.string().array(),
  issued_invoices_id: z.string().array(),
  received_vouchers: z
    .object({
      id: z.string(),
      type: ExpenseTypeSchema,
    })
    .array(),
});
