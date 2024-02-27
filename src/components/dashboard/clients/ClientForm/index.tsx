import {
  Alert,
  Button,
  DialogActions,
  DialogContent,
  Stack,
} from '@mui/material';
import { Form, Formik, FormikConfig } from 'formik';
import { FC, useState } from 'react';

type FormikProps = Pick<
  FormikConfig<any>,
  'initialValues' | 'validationSchema'
>;

interface ClientFormProps extends FormikProps {
  onSubmit: FormikConfig<any>['onSubmit'];
  onClose: VoidFunction;
  infoText?: string;
}

const ClientForm: FC<ClientFormProps> = ({
  onClose,
  onSubmit,
  infoText,
  ...formikProps
}) => {
  const [formError, setFormError] = useState('');

  const handleSubmit: FormikConfig<any>['onSubmit'] = (values, helpers) => {
    onSubmit(values, helpers);
  };

  return (
    <Formik {...formikProps} onSubmit={handleSubmit}>
      {() => (
        <Form>
          <Stack component={DialogContent}>
            <Alert>Formulario de Cliente</Alert>
          </Stack>

          <DialogActions>
            <Button variant="contained">Cancelar</Button>
            <Button variant="contained">Guardar</Button>
          </DialogActions>
        </Form>
      )}
    </Formik>
  );
};

export default ClientForm;
