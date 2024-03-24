import { MenuItem } from '@mui/material';
import { FormikTextField } from '@src/components/shared/formik-components';
import { useListProjects } from '@src/hooks/cache/projects';

export const VoucherProjectSelector = () => {
  const { data: projects } = useListProjects();

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
    >
      <MenuItem sx={{ fontStyle: 'italic' }} key="void" value="">
        Ninguno
      </MenuItem>
      {filteredProjects.map((project) => (
        <MenuItem key={project.id} value={project.id}>
          {project.name}
        </MenuItem>
      ))}
    </FormikTextField>
  );
};
