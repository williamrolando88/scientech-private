import { LoadingButton } from '@mui/lab';
import {
  Alert,
  Button,
  DialogActions,
  DialogContent,
  Grid,
  Stack,
} from '@mui/material';
import {
  FormikAutoCalculateField,
  FormikDatePicker,
  FormikTextField,
} from '@src/components/shared/formik-components';
import { extendedSaleNoteBuilder } from '@src/lib/modules/expenses';
import { ExpensesCommonSchema } from '@src/lib/schemas/expenses';
import { ExtendedExpense } from '@src/types/expenses';
import { Form, Formik, FormikConfig } from 'formik';
import { FC } from 'react';
import { toFormikValidationSchema } from 'zod-formik-adapter';
import { ProjectSelector } from '../../ProjectSelector';
import { TotalField } from '../../TotalField';

type FormikProps = Pick<
  FormikConfig<ExtendedExpense>,
  'initialValues' | 'onSubmit'
>;

export interface BaseSaleNoteFormProps extends FormikProps {
  onClose?: VoidFunction;
  infoText?: string;
}

const BaseSaleNoteForm: FC<BaseSaleNoteFormProps> = ({
  onClose,
  infoText,
  initialValues,
  onSubmit,
}) => {
  const isUpdating = Boolean(initialValues.id);

  const preSubmit: BaseSaleNoteFormProps['onSubmit'] = (
    formData,
    formActions
  ) => {
    const processedData = extendedSaleNoteBuilder(formData);

    onSubmit(processedData, formActions);
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={preSubmit}
      validationSchema={toFormikValidationSchema(ExpensesCommonSchema)}
    >
      {({ isSubmitting }) => (
        <Form>
          <Stack component={DialogContent} gap={2}>
            <Alert severity="info">{infoText}</Alert>

            <Grid container columns={12} spacing={2}>
              <Grid item xs={9} />

              <Grid item xs={3}>
                <FormikDatePicker
                  size="small"
                  fullWidth
                  name="issue_date"
                  label="Fecha de Emisión"
                  required
                />
              </Grid>

              <Grid item xs={12}>
                <FormikTextField
                  size="small"
                  fullWidth
                  name="issuer_name"
                  label="Emisor y/o motivo"
                  required
                />
              </Grid>

              <Grid item xs={12}>
                <FormikTextField
                  size="small"
                  multiline
                  rows={3}
                  fullWidth
                  name="description"
                  label="Descripción"
                />
              </Grid>

              <Grid item xs={9} />

              <Grid item xs={3}>
                <FormikAutoCalculateField
                  size="small"
                  fullWidth
                  name="tax_exempted_subtotal"
                  label="Subtotal"
                />
              </Grid>

              <Grid item xs={9} />

              <Grid item xs={3}>
                <TotalField />
              </Grid>

              <Grid item xs={7}>
                <ProjectSelector />
              </Grid>

              <Grid item xs={5} />
            </Grid>
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
              {isUpdating ? 'Actualizar' : 'Guardar'}
            </LoadingButton>
          </DialogActions>
        </Form>
      )}
    </Formik>
  );
};

export default BaseSaleNoteForm;
