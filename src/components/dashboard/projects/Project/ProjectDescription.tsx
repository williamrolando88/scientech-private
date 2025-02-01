import { Card } from '@mui/material';
import { Project } from '@src/types/projects';
import { FC } from 'react';

interface Props {
  project: Project;
}

const ProjectDescription: FC<Props> = ({ project }) => (
  <Card sx={{ p: 2 }}>
    <code>{JSON.stringify(project, null, 2)}</code>
  </Card>
);

export default ProjectDescription;
