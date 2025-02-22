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
import { SaleNoteSchema } from '@src/lib/schemas/purchases';
import { SaleNote } from '@src/types/purchases';
import { Form, Formik, FormikConfig } from 'formik';
import { FC } from 'react';
import { toFormikValidationSchema } from 'zod-formik-adapter';
import { AccountCategorySelector } from '../../AccountCategorySelector';
import { ProjectSelector } from '../../ProjectSelector';

type FormikProps = Pick<FormikConfig<SaleNote>, 'initialValues' | 'onSubmit'>;

export interface BaseSaleNoteFormProps extends FormikProps {
  onClose?: VoidFunction;
  infoText?: string;
}

const BaseSaleNoteForm: FC<BaseSaleNoteFormProps> = ({
  onClose,
  infoText,
  initialValues,
  onSubmit,
}) => (
  <Formik
    initialValues={initialValues}
    onSubmit={onSubmit}
    validationSchema={toFormikValidationSchema(SaleNoteSchema)}
  >
    {({ isSubmitting, values }) => (
      <Form>
        <Stack component={DialogContent} gap={2}>
          <Alert severity="info">{infoText}</Alert>

          <Grid container columns={12} spacing={2}>
            <Grid item xs={1}>
              <FormikTextField
                size="small"
                fullWidth
                name="establishment"
                label="Suc."
                type="number"
              />
            </Grid>

            <Grid item xs={1}>
              <FormikTextField
                size="small"
                fullWidth
                name="emissionPoint"
                label="Pto."
                type="number"
              />
            </Grid>

            <Grid item xs={2}>
              <FormikTextField
                size="small"
                fullWidth
                name="sequentialNumber"
                label="Nro."
                type="number"
              />
            </Grid>

            <Grid item xs={5} />

            <Grid item xs={3}>
              <FormikDatePicker
                size="small"
                fullWidth
                name="issueDate"
                label="Fecha de Emisión"
                required
              />
            </Grid>

            <Grid item xs={3}>
              <FormikTextField
                size="small"
                fullWidth
                name="issuerId"
                label="CI/RUC Emisor"
                required
              />
            </Grid>

            <Grid item xs={9}>
              <FormikTextField
                size="small"
                fullWidth
                name="issuerName"
                label="Razón Social Emisor"
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
                required
              />
            </Grid>

            <Grid item xs={12}>
              <AccountCategorySelector
                size="small"
                label="Cuenta de gasto"
                name="expenseAccount"
                selectableCategories={ALLOWED_ACCOUNTS.SALE_NOTE.EXPENSE}
                initialValue={DEFAULT_ACCOUNT.SALE_NOTE.EXPENSE}
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

export default BaseSaleNoteForm;
