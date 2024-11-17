import { LoadingButton } from '@mui/lab';
import { Alert, Button, DialogActions, DialogContent, Stack } from '@mui/material';
import { DoubleEntryAccountingFormSchema } from '@src/lib/schemas/doubleEntryAccounting';
import { DoubleEntryAccounting, DoubleEntryAccountingForm } from '@src/types/doubleEntryAccounting';
import { Form, Formik, FormikConfig, FormikHelpers } from 'formik';
import { FC, useState } from 'react';
import { FormikDatePicker, FormikTextField } from 'src/components/shared/formik-components';
import { dayBookTransactionsValidator } from 'src/lib/modules/dayBook';
import { toFormikValidationSchema } from 'zod-formik-adapter';
import { DayBookTransactionSummary } from './DayBookTransactionSummary';
import { DayBookTransactionsTable } from './DayBookTransactionsTable';
import { convertFromForm, convertToForm } from '@src/lib/modules/doubleEntryAccounting';

interface DayBookTransactionFormProps {
  onSubmit: FormikConfig<DoubleEntryAccounting>['onSubmit'];
  onClose: VoidFunction;
  infoText?: string;
  initialValues: DoubleEntryAccounting;
}

export const DayBookTransactionForm: FC<DayBookTransactionFormProps> = ({
                                                                          onSubmit,
                                                                          onClose,
                                                                          infoText,
                                                                          initialValues,
                                                                        }) => {
  const [formError, setFormError] = useState('');

  const handleSubmit: FormikConfig<DoubleEntryAccountingForm>['onSubmit'] = (
    values,
    helpers,
  ) => {
    const error = dayBookTransactionsValidator(values);
    const convertedValues = convertFromForm(values);

    if (error) {
      setFormError(error);
      helpers.setSubmitting(false);
      return;
    }

    setFormError('');
    onSubmit(convertedValues, helpers as unknown as FormikHelpers<DoubleEntryAccounting>);
  };

  return (
    <Formik
      initialValues={convertToForm(initialValues)}
      validationSchema={toFormikValidationSchema(DoubleEntryAccountingFormSchema)}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting }) => (
        <Form>
          <Stack component={DialogContent} gap={2}>
            <Alert severity="info">{infoText}</Alert>

            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
            >
              <FormikDatePicker name="issueDate" label="Fecha" />

              <DayBookTransactionSummary />
            </Stack>

            <FormikTextField
              size="small"
              multiline
              rows={3}
              fullWidth
              name="description"
              label="Descripción"
            />

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
