import { Button, Dialog, DialogTitle } from '@mui/material';
import { useAddProject } from '@src/hooks/cache/projects';
import { PROJECTS_INITIAL_VALUE } from '@src/lib/constants/projects';
import { ProjectParser } from '@src/lib/parsers/projects';
import { useAuthContext } from '@src/services/auth/useAuthContext';
import { Project } from '@src/types/projects';
import { FormikConfig } from 'formik';
import { useSnackbar } from 'notistack';
import { FC, useState } from 'react';
import { toFormikValidationSchema } from 'zod-formik-adapter';
import ProjectForm from './ProjectForm';

const AddProject: FC = () => {
  const [openModal, setOpenModal] = useState(false);
  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);
  const { user } = useAuthContext();
  const { mutateAsync: addProject } = useAddProject();
  const { enqueueSnackbar } = useSnackbar();

  const onSubmit: FormikConfig<Project>['onSubmit'] = (
    values,
    { setSubmitting, resetForm }
  ) => {
    values.events = [
      { date: new Date(), action: 'created', user_id: user?.id },
    ];

    addProject(values)
      .then(() => {
        resetForm();
        enqueueSnackbar('Proyecto guardado exitosamente');
        handleCloseModal();
      })
      .catch((error) => {
        values.events = [];
        console.error(error);
        enqueueSnackbar('Error al guardar el proyecto', {
          variant: 'error',
        });
      })
      .finally(() => {
        setSubmitting(false);
      });
  };

  return (
    <>
      <Button variant="contained" onClick={handleOpenModal}>
        Nuevo
      </Button>

      <Dialog
        fullWidth
        maxWidth="lg"
        open={openModal}
        onClose={handleCloseModal}
      >
        <DialogTitle>Crear Proyecto</DialogTitle>

        <ProjectForm
          infoText="Es hora de crear un nuevo proyecto"
          initialValues={PROJECTS_INITIAL_VALUE}
          onSubmit={onSubmit}
          onClose={handleCloseModal}
          validationSchema={toFormikValidationSchema(ProjectParser)}
        />
      </Dialog>
    </>
  );
};

export default AddProject;
