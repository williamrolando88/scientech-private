import { MenuItem } from '@mui/material';
import { FormikTextField } from '@src/components/shared/formik-components';
import { useListProjects } from '@src/hooks/cache/projects';
import { getProjectName } from '@src/lib/modules/projects/projects';
import { FC } from 'react';

interface Props {
  disabled?: boolean;
}

export const ProjectSelector: FC<Props> = ({ disabled }) => {
  const { data: projects, isLoading: isLoadingProjects } = useListProjects();

  const activeProjects = projects
    .filter((project) => project.status === 'active')
    .sort((a, b) => (a.number ?? 0) - (b.number ?? 0));

  return (
    <FormikTextField
      select
      fullWidth
      size="small"
      name="ref.projectId"
      label="Proyecto asociado"
      disabled={disabled}
    >
      <MenuItem sx={{ fontStyle: 'italic' }} key="void" value="">
        Ninguno
      </MenuItem>
      {!isLoadingProjects &&
        activeProjects.map((project) => (
          <MenuItem key={project.id} value={project.id}>
            {getProjectName(project)}
          </MenuItem>
        ))}
    </FormikTextField>
  );
};
