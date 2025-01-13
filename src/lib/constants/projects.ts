import { Project } from '@src/types/projects';

export const PROJECTS_INITIAL_VALUE: Project = {
  id: '',
  number: 1,
  client: {
    name: '',
  },
  status: 'active',
  description: '',
  startedAt: new Date(),
  estimateFinishDate: new Date(),
  budget: 0,
  profitMargin: 20,
  ref: {},
};
