import { MenuItem } from '@mui/material';
import { FormikTextField } from '@src/components/shared/formik-components';
import { useListProjects } from '@src/hooks/cache/projects';
import { FC } from 'react';

interface VoucherProjectSelectorProps {
  disabled?: boolean;
}

export const VoucherProjectSelector: FC<VoucherProjectSelectorProps> = ({
  disabled,
}) => {
  const { data: projects, isLoading } = useListProjects();

  const filteredProjects = projects.filter(
    (project) => project.status === 'active'
  );

  return (
    <FormikTextField
      select
      fullWidth
      size="small"
      name="project_id"
      label="Proyecto asociado"
      disabled={disabled}
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
