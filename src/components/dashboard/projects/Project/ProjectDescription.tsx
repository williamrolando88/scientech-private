import { Project } from '@src/types/projects';
import { FC } from 'react';

interface Props {
  project: Project;
}

const ProjectDescription: FC<Props> = ({ project }) => {
  return <em>{JSON.stringify(project, null, 2)}</em>;
};

export default ProjectDescription;
