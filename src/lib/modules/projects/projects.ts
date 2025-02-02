import { Project } from '@src/types/projects';

export const getProjectName = (project: Project) => {
  const description = project.description
    ?.split('\\n')
    .map((s) => s.trim())
    .join(' ');

  let text = '';
  if (project.number) text += project.number;
  if (project?.client?.name) text += ` (${project.client.name}): `;
  if (description) text += description;

  return text;
};
