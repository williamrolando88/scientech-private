import {
  Alert,
  Button,
  DialogActions,
  DialogContent,
  Stack,
} from '@mui/material';
import { Form, Formik, FormikConfig } from 'formik';
import { FC } from 'react';
import { FormikDatePicker } from 'src/components/shared/formik-components';
import { DayBookTransaction } from 'src/types/dayBook';
import { DayBookTransactionsTable } from './DayBookTransactionsTable';

type FormikProps = Pick<
  FormikConfig<DayBookTransaction>,
  'initialValues' | 'validationSchema'
>;

interface DayBookTransactionFormProps extends FormikProps {
  onSubmit: FormikConfig<DayBookTransaction>['onSubmit'];
  onClose: VoidFunction;
}

export const DayBookTransactionForm: FC<DayBookTransactionFormProps> = (
  props
) => {
  const { onSubmit, onClose } = props;

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

            <Stack width="30%">
              <FormikDatePicker name="date" label="Fecha" />
            </Stack>

            <DayBookTransactionsTable />
          </Stack>

          <DialogActions>
            <Button onClick={onClose}>Cancelar</Button>
            <Button type="submit">Guardar</Button>
          </DialogActions>
        </Form>
      )}
    </Formik>
  );
};
