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
import { ALLOWED_ACCOUNTS, DEFAULT_ACCOUNT } from '@src/lib/constants/settings';
import { NonDeductibleSchema } from '@src/lib/schemas/purchases';
import { NonDeductible } from '@src/types/purchases';
import { Form, Formik, FormikConfig } from 'formik';
import { FC } from 'react';
import { toFormikValidationSchema } from 'zod-formik-adapter';
import { AccountCategorySelector } from '../../AccountCategorySelector';
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
}) => (
  <Formik
    initialValues={initialValues}
    onSubmit={onSubmit}
    validationSchema={toFormikValidationSchema(NonDeductibleSchema)}
  >
    {({ isSubmitting, values }) => (
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

            <Grid item xs={12}>
              <AccountCategorySelector
                size="small"
                label="Cuenta de gasto"
                name="expenseAccount"
                selectableCategories={ALLOWED_ACCOUNTS.NON_DEDUCTIBLE.EXPENSE}
                initialValue={DEFAULT_ACCOUNT.NON_DEDUCTIBLE.EXPENSE}
                required
              />
            </Grid>

            <Grid item xs={7}>
              <ProjectSelector disabled={values.paid} />
            </Grid>

            <Grid item xs={2} />

            <Grid item xs={3}>
              <FormikAutoCalculateField
                size="small"
                fullWidth
                name="total"
                label="Total"
                required
                disabled={values.paid}
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
            Guardar
          </LoadingButton>
        </DialogActions>
      </Form>
    )}
  </Formik>
);

export default BaseNonDeductibleForm;
