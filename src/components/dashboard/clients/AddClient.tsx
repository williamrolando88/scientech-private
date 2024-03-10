import { Button, Dialog, DialogTitle } from '@mui/material';
import { useAddClient, useListClients } from '@src/hooks/cache/clients';
import { CLIENT_INITIAL_VALUE } from '@src/lib/constants/client';
import { ClientSchema } from '@src/lib/schemas/clients';
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
  const { mutateAsync: addClient } = useAddClient();
  const { data: clients } = useListClients();
  const { enqueueSnackbar } = useSnackbar();

  const onSubmit: FormikConfig<Client>['onSubmit'] = (
    values,
    { setSubmitting }
  ) => {
    if (clients?.find((client) => client.id === values.id)) {
      enqueueSnackbar('El cliente ya existe', {
        variant: 'error',
      });
      setSubmitting(false);
      return;
    }

    addClient(values)
      .then(() => {
        enqueueSnackbar('Cliente guardado exitosamente');
        handleCloseModal();
      })
      .catch((error) => {
        console.error(error);
        enqueueSnackbar('Error al guardar el cliente', {
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
        <DialogTitle>Agregar Cliente</DialogTitle>

        <ClientForm
          infoText="Aquí puedes agregar nuevos clientes"
          initialValues={CLIENT_INITIAL_VALUE}
          onSubmit={onSubmit}
          onClose={handleCloseModal}
          validationSchema={toFormikValidationSchema(ClientSchema)}
        />
      </Dialog>
    </>
  );
};

export default AddClient;
