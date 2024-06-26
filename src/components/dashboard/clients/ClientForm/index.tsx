import { LoadingButton } from '@mui/lab';
import {
  Alert,
  Button,
  DialogActions,
  DialogContent,
  Grid,
  Stack,
} from '@mui/material';
import { FormikTextField } from '@src/components/shared/formik-components';
import { useListClients } from '@src/hooks/cache/clients';
import { Client } from '@src/types/clients';
import { Form, Formik, FormikConfig } from 'formik';
import { FC } from 'react';
import { ContactForm } from './ContactForm';

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
}) => {
  const { data: clients } = useListClients();

  const handleSubmit: FormikConfig<Client>['onSubmit'] = (values, helpers) => {
    if (clients?.find((client) => client.id === values.id)) {
      helpers.setErrors({ id: 'El cliente ya existe' });
      helpers.setSubmitting(false);
      return;
    }

    onSubmit(values, helpers);
  };

  return (
    <Formik {...formikProps} onSubmit={handleSubmit}>
      {({ isSubmitting }) => (
        <Form>
          <Stack component={DialogContent} gap={2}>
            <Alert severity="info">{infoText}</Alert>

            <Grid container columns={6} rowSpacing={2} columnSpacing={2}>
              <Grid item xs={4}>
                <FormikTextField
                  fullWidth
                  label="Nombre"
                  name="name"
                  required
                />
              </Grid>

              <Grid item xs={2}>
                <FormikTextField fullWidth label="CI/RUC" name="id" required />
              </Grid>

              <Grid item xs={6}>
                <FormikTextField fullWidth label="Dirección" name="address" />
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
};

export default ClientForm;
