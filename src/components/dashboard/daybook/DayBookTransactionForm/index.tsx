import {
  Alert,
  Button,
  DialogActions,
  DialogContent,
  Stack,
} from '@mui/material';
import { Form, Formik, FormikConfig } from 'formik';
import { FC, useState } from 'react';
import { FormikDatePicker } from 'src/components/shared/formik-components';
import { dayBookTransactionsValidatior } from 'src/lib/modules/dayBook';
import { DayBookTransaction } from 'src/types/dayBook';
import { DayBookTransactionsTable } from './DayBookTransactionsTable';

type FormikProps = Pick<
  FormikConfig<DayBookTransaction>,
  'initialValues' | 'validationSchema'
>;

interface DayBookTransactionFormProps extends FormikProps {
  onSubmit: FormikConfig<DayBookTransaction>['onSubmit'];
  onClose: VoidFunction;
  infoText?: string;
}

export const DayBookTransactionForm: FC<DayBookTransactionFormProps> = (
  props
) => {
  const { onSubmit, onClose, infoText } = props;
  const [formError, setFormError] = useState('');

  const handleSubmit: FormikConfig<DayBookTransaction>['onSubmit'] = (
    values,
    helpers
  ) => {
    const error = dayBookTransactionsValidatior(values);

    if (error) {
      setFormError(error);
      return;
    }

    setFormError('');

    onSubmit(values, helpers);
  };

  return (
    <Formik {...props} onSubmit={handleSubmit}>
      {() => (
        <Form>
          <Stack component={DialogContent} gap={2}>
            <Alert severity="info">{infoText}</Alert>

            <Stack width="30%">
              <FormikDatePicker name="date" label="Fecha" />
            </Stack>

            <DayBookTransactionsTable />

            {formError && <Alert severity="error">{formError}</Alert>}
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
