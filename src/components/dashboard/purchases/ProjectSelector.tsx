import { MenuItem } from '@mui/material';
import { FormikTextField } from '@src/components/shared/formik-components';
import { useListProjects } from '@src/hooks/cache/projects';
import { getProjectName } from '@src/lib/modules/projects';
import { FC } from 'react';

export const ProjectSelector: FC = () => {
  const { data: projects, isLoading: isLoadingProjects } = useListProjects();

  const filteredProjects = projects
    .filter((project) => project.status === 'active')
    .sort((a, b) => a.number ?? 0 - b.number ?? 0);

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
      {!isLoadingProjects &&
        filteredProjects.map((project) => (
          <MenuItem key={project.id} value={project.id}>
            {getProjectName(project)}
          </MenuItem>
        ))}
    </FormikTextField>
  );
};
