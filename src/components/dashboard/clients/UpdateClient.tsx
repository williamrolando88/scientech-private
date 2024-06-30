import { Dialog, DialogTitle } from '@mui/material';
import { useUpsertClient } from '@src/hooks/cache/clients';
import { ClientSchema } from '@src/lib/schemas/clients';
import { Client } from '@src/types/clients';
import { FormikConfig } from 'formik';
import { useSnackbar } from 'notistack';
import { FC } from 'react';
import { toFormikValidationSchema } from 'zod-formik-adapter';
import ClientForm from './ClientForm';

interface UpdateClientProps {
  initialValues: Client | null;
  open: boolean;
  onClose: VoidFunction;
}

const UpdateClient: FC<UpdateClientProps> = ({
  initialValues,
  open,
  onClose,
}) => {
  const { mutateAsync: addClient } = useUpsertClient();
  const { enqueueSnackbar } = useSnackbar();

  const onSubmit: FormikConfig<Client>['onSubmit'] = (
    values,
    { setSubmitting }
  ) => {
    addClient(values)
      .then(() => {
        enqueueSnackbar('Cliente guardado exitosamente');
        onClose();
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

  if (!initialValues) return null;

  return (
    <Dialog fullWidth maxWidth="lg" open={open} onClose={onClose}>
      <DialogTitle>Agregar Cliente</DialogTitle>

      <ClientForm
        infoText="Aquí puedes agregar nuevos clientes"
        initialValues={initialValues}
        onSubmit={onSubmit}
        onClose={onClose}
        validationSchema={toFormikValidationSchema(ClientSchema)}
        isUpdating
      />
    </Dialog>
  );
};

export default UpdateClient;
