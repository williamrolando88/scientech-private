import { Stack, Typography } from '@mui/material';
import { Project } from '@src/types/projects';
import { FC } from 'react';
import ProjectDescription from './ProjectDescription';
import ProjectResults from './ProjectResults';

interface Props {
  project: Project | null;
}

const ProjectBasePage: FC<Props> = ({ project }) => {
  if (!project) {
    return (
      <Typography variant="body1">
        No hay informacion del proyecto solicitado
      </Typography>
    );
  }

  return (
    <Stack>
      <ProjectDescription project={project} />
      <ProjectResults id={project.id ?? ''} />
    </Stack>
  );
};

export default ProjectBasePage;
