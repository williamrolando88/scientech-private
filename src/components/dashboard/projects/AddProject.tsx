import { Button, Dialog, DialogTitle } from '@mui/material';
import { PROJECTS_INITIAL_VALUE } from '@src/lib/constants/projects';
import { ProjectParser } from '@src/lib/parsers/projects';
import { Project } from '@src/types/projects';
import { FormikConfig } from 'formik';
import { FC, useState } from 'react';
import { toFormikValidationSchema } from 'zod-formik-adapter';
import ProjectForm from './ProjectForm';

const AddProject: FC = () => {
  const [openModal, setOpenModal] = useState(false);
  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

  const onSubmit: FormikConfig<Project>['onSubmit'] = (
    values,
    { setSubmitting }
  ) => {
    console.log('values', values);
    setSubmitting(false);
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
