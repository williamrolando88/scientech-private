import { Project } from '@src/types/projects';

export const PROJECTS_INITIAL_VALUE: Project = {
  id: '',
  name: '',
  client_id: '',
  description: '',
  start_date: new Date(),
  end_date: new Date(),
  status: 'active',
};
