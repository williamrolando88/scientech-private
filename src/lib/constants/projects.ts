import { Project } from '@src/types/projects';

export const PROJECTS_INITIAL_VALUE: Project = {
  id: '' as unknown as number,
  name: '',
  client_id: '',
  description: '',
  start_date: new Date(),
  end_date: new Date(),
  status: 'active',
  custom_payments_id: [],
  events: [],
  issued_invoices_id: [],
  issued_quotations_id: [],
  received_invoices_id: [],
};
