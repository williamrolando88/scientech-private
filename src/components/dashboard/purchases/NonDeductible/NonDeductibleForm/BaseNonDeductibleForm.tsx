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
import { NonDeductibleSchema } from '@src/lib/schemas/purchases/nonDeductible';
import { NonDeductible } from '@src/types/purchases';
import { Form, Formik, FormikConfig } from 'formik';
import { FC } from 'react';
import { toFormikValidationSchema } from 'zod-formik-adapter';
import { ProjectSelector } from '../../ProjectSelector';

type FormikProps = Pick<
  FormikConfig<NonDeductible>,
  'initialValues' | 'onSubmit'
>;

export interface BaseNonDeductibleFormProps extends FormikProps {
  onClose?: VoidFunction;
  infoText?: string;
}

const BaseNonDeductibleForm: FC<BaseNonDeductibleFormProps> = ({
  onClose,
  infoText,
  initialValues,
  onSubmit,
}) => {
  const isUpdating = Boolean(initialValues.id);

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={toFormikValidationSchema(NonDeductibleSchema)}
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
                  name="issueDate"
                  label="Fecha de Emisión"
                  required
                />
              </Grid>

              <Grid item xs={12}>
                <FormikTextField
                  size="small"
                  fullWidth
                  name="issuerName"
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

              <Grid item xs={7}>
                <ProjectSelector />
              </Grid>

              <Grid item xs={2} />

              <Grid item xs={3}>
                <FormikAutoCalculateField
                  size="small"
                  fullWidth
                  name="total"
                  label="Total"
                  required
                />
              </Grid>
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

export default BaseNonDeductibleForm;
