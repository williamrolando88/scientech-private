import { MenuItem } from '@mui/material';
import { FormikTextField } from '@src/components/shared/formik-components';
import { useListProjects } from '@src/hooks/cache/projects';
import { FC } from 'react';

export const VoucherProjectSelector: FC = () => {
  const { data: projects, isLoading } = useListProjects();

  const filteredProjects = projects.filter(
    (project) => project.status === 'active'
  );

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
      {!isLoading &&
        filteredProjects.map((project) => (
          <MenuItem key={project.id} value={project.id}>
            {project.name}
          </MenuItem>
        ))}
    </FormikTextField>
  );
};
