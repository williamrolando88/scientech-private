import { Dialog, DialogTitle } from '@mui/material';
import { useMigrateProject } from '@src/hooks/cache/projects';
import { PROJECTS_INITIAL_VALUE } from '@src/lib/constants/projects';
import { Project } from '@src/types/projects';
import { FormikConfig } from 'formik';
import { useSnackbar } from 'notistack';
import { FC } from 'react';
import ProjectForm from './ProjectForm';

interface Props {
  project: Project | null;
  open: boolean;
  onClose: VoidFunction;
}

const MigrateProject: FC<Props> = ({ open, project, onClose }) => {
  const { enqueueSnackbar } = useSnackbar();
  const { mutateAsync: migrateProject } = useMigrateProject();

  const onSubmit: FormikConfig<Project>['onSubmit'] = (
    values,
    { setSubmitting, resetForm }
  ) => {
    migrateProject(values)
      .then(() => {
        resetForm();
        enqueueSnackbar('Proyecto actualizado exitosamente');
        onClose();
      })
      .catch((error) => {
        console.error(error);
        enqueueSnackbar('Error al guardar el proyecto', {
          variant: 'error',
        });
      })
      .finally(() => {
        setSubmitting(false);
      });
  };

  if (!project) return null;

  const initialValues = { ...PROJECTS_INITIAL_VALUE };

  return (
    <Dialog fullWidth maxWidth="md" open={open} onClose={onClose}>
      <DialogTitle>Actualizar Proyecto</DialogTitle>

      <ProjectForm
        infoText="Para continuar a la siguiente pantalla es necesario actualizar la información del proyecto"
        initialValues={initialValues}
        onSubmit={onSubmit}
        onClose={onClose}
      />
    </Dialog>
  );
};

export default MigrateProject;
