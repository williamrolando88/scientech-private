import {
  Alert,
  Box,
  Button,
  Card,
  DialogActions,
  DialogContent,
  Stack,
  TextField,
} from '@mui/material';
import { Form, Formik, FormikConfig } from 'formik';
import { FC } from 'react';
import { FormikTextField } from 'src/components/shared/formik-components';
import Iconify from 'src/components/shared/iconify';
import { DayBookTransaction } from 'src/types/dayBook';

type FormikProps = Pick<
  FormikConfig<DayBookTransaction>,
  'initialValues' | 'validationSchema'
>;

interface DayBookTransactionFormProps extends FormikProps {
  onSubmit: FormikConfig<DayBookTransaction>['onSubmit'];
}

export const DayBookTransactionForm: FC<DayBookTransactionFormProps> = (
  props
) => {
  const { onSubmit } = props;

  const handleSubmit: FormikConfig<DayBookTransaction>['onSubmit'] = (
    values,
    helpers
  ) => {
    onSubmit(values, helpers);
  };

  return (
    <Formik {...props} onSubmit={handleSubmit}>
      {() => (
        <Form>
          <Stack component={DialogContent} gap={2}>
            <Alert severity="info">
              Aqui va el formulario de asiento contable
            </Alert>

            <Stack>
              <TextField label="Fecha" />
            </Stack>

            <Stack component={Card} variant="outlined" p={2}>
              <Stack direction="row">
                <Box>Cuenta</Box>
                <Box>Descripción cuenta</Box>
                <Box>Debe</Box>
                <Box>Haber</Box>
                <Box>Descripción de la Transacción</Box>
                <Box>Cotización</Box>
                <Box>Factura</Box>
              </Stack>

              <Stack direction="row">
                <FormikTextField name="account" />
                <TextField />
                <TextField />
                <TextField />
                <TextField />
                <TextField />
                <TextField />
                <TextField />
                <Button variant="outlined" color="error">
                  <Iconify icon="pajamas:remove" />
                </Button>
              </Stack>

              <Button variant="soft">Agregar</Button>
            </Stack>
          </Stack>

          <DialogActions>
            <Button>Cancelar</Button>
            <Button>Guardar</Button>
          </DialogActions>
        </Form>
      )}
    </Formik>
  );
};
