import { LoadingButton } from '@mui/lab';
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
import { dayBookTransactionsValidator } from 'src/lib/modules/dayBook';
import { DayBookTransaction } from 'src/types/dayBook';
import { DayBookTransactionSummary } from './DayBookTransactionSummary';
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

export const DayBookTransactionForm: FC<DayBookTransactionFormProps> = ({
  onSubmit,
  onClose,
  infoText,
  ...formikProps
}) => {
  const [formError, setFormError] = useState('');

  const handleSubmit: FormikConfig<DayBookTransaction>['onSubmit'] = (
    values,
    helpers
  ) => {
    const error = dayBookTransactionsValidator(values);

    if (error) {
      setFormError(error);
      return;
    }

    setFormError('');

    onSubmit(values, helpers);
  };

  return (
    <Formik {...formikProps} onSubmit={handleSubmit}>
      {({ isSubmitting }) => (
        <Form>
          <Stack component={DialogContent} gap={2}>
            <Alert severity="info">{infoText}</Alert>

            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
            >
              <FormikDatePicker name="date" label="Fecha" />

              <DayBookTransactionSummary />
            </Stack>

            <DayBookTransactionsTable />

            {formError && <Alert severity="error">{formError}</Alert>}
          </Stack>

          <DialogActions>
            <Button onClick={onClose} disabled={isSubmitting}>
              Cancelar
            </Button>

            <LoadingButton
              variant="contained"
              type="submit"
              loading={isSubmitting}
            >
              Guardar
            </LoadingButton>
          </DialogActions>
        </Form>
      )}
    </Formik>
  );
};
