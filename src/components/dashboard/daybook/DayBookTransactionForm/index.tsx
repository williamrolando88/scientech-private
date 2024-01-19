import {
  Alert,
  Button,
  DialogActions,
  DialogContent,
  Stack,
} from '@mui/material';
import { Form, Formik, FormikConfig } from 'formik';
import { FC } from 'react';
import { FormikTextField } from 'src/components/shared/formik-components';
import { DayBookTransaction } from 'src/types/dayBook';
import { DayBookTransactionsTable } from './DayBookTransactionsTable';

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
              <FormikTextField
                name="date"
                label="Fecha"
                type="datetime-local"
              />
            </Stack>

            <DayBookTransactionsTable />
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
