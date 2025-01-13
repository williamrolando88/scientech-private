import { Button, Dialog, DialogTitle } from '@mui/material';
import { useAddProject } from '@src/hooks/cache/projects';
import { PROJECTS_INITIAL_VALUE } from '@src/lib/constants/projects';
import { Project } from '@src/types/projects';
import { FormikConfig } from 'formik';
import { useSnackbar } from 'notistack';
import { FC, useState } from 'react';
import ProjectForm from './ProjectForm';

const AddProject: FC = () => {
  const [openModal, setOpenModal] = useState(false);
  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);
  const { mutateAsync: addProject } = useAddProject();
  const { enqueueSnackbar } = useSnackbar();

  const onSubmit: FormikConfig<Project>['onSubmit'] = (
    values,
    { setSubmitting, resetForm }
  ) => {
    addProject(values)
      .then(() => {
        resetForm();
        enqueueSnackbar('Proyecto guardado exitosamente');
        handleCloseModal();
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
          infoText="Ingrese la información requerida para crear un nuevo proyecto"
          initialValues={PROJECTS_INITIAL_VALUE}
          onSubmit={onSubmit}
          onClose={handleCloseModal}
        />
      </Dialog>
    </>
  );
};

export default AddProject;
