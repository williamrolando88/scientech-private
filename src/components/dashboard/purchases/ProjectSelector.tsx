import { MenuItem } from '@mui/material';
import { FormikTextField } from '@src/components/shared/formik-components';
import { useListClients } from '@src/hooks/cache/clients';
import { useListProjects } from '@src/hooks/cache/projects';
import { Project } from '@src/types/projects';
import { FC } from 'react';

export const ProjectSelector: FC = () => {
  const { data: projects, isLoading: isLoadingProjects } = useListProjects();

  const { data: clients, isLoading: isLoadingClients } = useListClients();

  const filteredProjects = projects.filter(
    (project) => project.status === 'active'
  );

  const getProjectName = (project: Project) => {
    const client = clients.find((c) => c.id === project.client_id);

    return `${project.name}(${client?.name}): ${project.description}`;
  };

  return (
    <FormikTextField
      select
      fullWidth
      size="small"
      name="ref.projectId"
      label="Proyecto asociado"
    >
      <MenuItem sx={{ fontStyle: 'italic' }} key="void" value="">
        Ninguno
      </MenuItem>
      {!(isLoadingProjects && isLoadingClients) &&
        filteredProjects.map((project) => (
          <MenuItem key={project.id} value={project.id}>
            {getProjectName(project)}
          </MenuItem>
        ))}
    </FormikTextField>
  );
};
