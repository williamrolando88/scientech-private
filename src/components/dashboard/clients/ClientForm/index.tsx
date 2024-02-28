import { LoadingButton } from '@mui/lab';
import {
  Alert,
  Button,
  DialogActions,
  DialogContent,
  Divider,
  Grid,
  Stack,
} from '@mui/material';
import { FormikTextField } from '@src/components/shared/formik-components';
import { CLIENT_CONTACT_INITIAL_VALUE } from '@src/lib/constants/client';
import { Client } from '@src/types/clients';
import { Form, Formik, FormikConfig, useFormikContext } from 'formik';
import { FC } from 'react';
import { ContactRow } from './ContactRow';

type FormikProps = Pick<
  FormikConfig<Client>,
  'initialValues' | 'validationSchema'
>;

interface ClientFormProps extends FormikProps {
  onSubmit: FormikConfig<Client>['onSubmit'];
  onClose: VoidFunction;
  infoText?: string;
}

const ClientForm: FC<ClientFormProps> = ({
  onClose,
  onSubmit,
  infoText,
  ...formikProps
}) => (
  <Formik {...formikProps} onSubmit={onSubmit}>
    {({ isSubmitting }) => (
      <Form>
        <Stack component={DialogContent} gap={2}>
          <Alert severity="info">Formulario de Cliente</Alert>

          <Grid container columns={6} rowSpacing={2} columnSpacing={2}>
            <Grid item xs={2}>
              <FormikTextField fullWidth label="Nombre" name="name" required />
            </Grid>

            <Grid item xs={4}>
              <FormikTextField fullWidth label="CI/RUC" name="id" required />
            </Grid>

            <Grid item xs={6}>
              <FormikTextField
                fullWidth
                label="Dirección"
                name="address"
                required
              />
            </Grid>

            <Grid item xs={3}>
              <FormikTextField fullWidth label="Teléfono" name="phone" />
            </Grid>

            <Grid item xs={3}>
              <FormikTextField
                fullWidth
                label="Correo electrónico"
                name="email"
              />
            </Grid>
          </Grid>

          <ContactForm />
        </Stack>

        <DialogActions>
          <Button disabled={isSubmitting} onClick={onClose}>
            Cancelar
          </Button>

          <LoadingButton
            loading={isSubmitting}
            type="submit"
            variant="contained"
          >
            Guardar
          </LoadingButton>
        </DialogActions>
      </Form>
    )}
  </Formik>
);

export default ClientForm;

const ContactForm = () => {
  const { values, setFieldValue } = useFormikContext<Client>();

  const handleAddContactRow = () => {
    setFieldValue('contact', [...values.contact, CLIENT_CONTACT_INITIAL_VALUE]);
  };

  return (
    <>
      <Divider />

      <Button
        onClick={handleAddContactRow}
        variant="contained"
        color="success"
        sx={{ alignSelf: 'flex-end' }}
      >
        Agregar contacto
      </Button>

      <Stack gap={2}>
        {values.contact.map((_, index) => (
          <ContactRow key={index} index={index} />
        ))}
      </Stack>
    </>
  );
};
