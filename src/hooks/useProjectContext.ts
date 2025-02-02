import { ProjectContext } from '@src/components/dashboard/projects/Project/ProjectProvider';
import { useContext } from 'react';

export const useProjectContext = () => useContext(ProjectContext);
