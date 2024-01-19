import {
  Alert,
  Button,
  DialogActions,
  DialogContent,
  Stack,
  TextField,
} from '@mui/material';
import { DatePicker, DatePickerProps } from '@mui/x-date-pickers';
import { Form, Formik, FormikConfig, useFormikContext } from 'formik';
import { get } from 'lodash';
import { FC } from 'react';
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

            <Stack width="30%">
              <FormikDatePicker name="date" label="Fecha" />
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

interface FormikDatePickerProps
  extends Omit<
    DatePickerProps<null, null>,
    'value' | 'onChange' | 'renderInput'
  > {
  name: string;
}

const FormikDatePicker: FC<FormikDatePickerProps> = (props) => {
  const { name } = props;
  const { values, touched, errors, setFieldValue } = useFormikContext();

  const fieldValue = get(values, name, '');
  const fieldTouched = get(touched, name, false);
  const fieldError = get(errors, name, '');

  const handleChange = (value: string | null) => {
    setFieldValue(name, value);
  };
  return (
    <DatePicker
      value={fieldValue}
      onChange={handleChange}
      renderInput={(params) => (
        <TextField {...params} error={fieldTouched} helperText={fieldError} />
      )}
    />
  );
};
