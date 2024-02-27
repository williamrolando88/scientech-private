import { Button, Dialog, DialogTitle } from '@mui/material';
import { CLIENT_INITIAL_VALUE } from '@src/lib/constants/client';
import { ClientParser } from '@src/lib/parsers/clients';
import { Client } from '@src/types/clients';
import { FormikConfig } from 'formik';
import { useSnackbar } from 'notistack';
import { useState } from 'react';
import { toFormikValidationSchema } from 'zod-formik-adapter';
import ClientForm from './ClientForm';

const AddClient = () => {
  const [openModal, setOpenModal] = useState(false);
  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

  const { enqueueSnackbar } = useSnackbar();

  const onSubmit: FormikConfig<Client>['onSubmit'] = (
    values,
    { setSubmitting }
  ) => {
    console.log(values);
    enqueueSnackbar('Cliente guardado exitosamente');
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
        <DialogTitle>Agregar Cliente</DialogTitle>

        <ClientForm
          infoText="Aquí puedes agregar nuevos clientes"
          initialValues={CLIENT_INITIAL_VALUE}
          onSubmit={onSubmit}
          onClose={handleCloseModal}
          validationSchema={toFormikValidationSchema(ClientParser)}
        />
      </Dialog>
    </>
  );
};

export default AddClient;
