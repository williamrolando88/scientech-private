import { Stack } from '@mui/material';
import { FC } from 'react';
import ProjectDescription from './ProjectDescription';
import ProjectResults from './ProjectResults';

const ProjectBasePage: FC = () => (
  <Stack gap={4}>
    <ProjectDescription />
    <ProjectResults />
  </Stack>
);

export default ProjectBasePage;
