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
import { extendedInvoiceBuilder } from '@src/lib/modules/expenses';
import { InvoiceSchema } from '@src/lib/schemas/expenses';
import { ExtendedInvoice } from '@src/types/expenses';
import { Form, Formik, FormikConfig } from 'formik';
import { FC } from 'react';
import { toFormikValidationSchema } from 'zod-formik-adapter';
import { AccountCategorySelector } from './AccountCategorySelector';
import { VoucherIVAField } from './VoucherIVAField';
import { VoucherProjectSelector } from './VoucherProjectSelector';
import { VoucherTotalField } from './VoucherTotalField';

type FormikProps = Pick<
  FormikConfig<ExtendedInvoice>,
  'initialValues' | 'onSubmit'
>;

export interface InvoiceFormProps extends FormikProps {
  onClose: VoidFunction;
  infoText?: string;
}

const BaseInvoiceForm: FC<InvoiceFormProps> = ({
  onClose,
  infoText,
  initialValues,
  onSubmit,
}) => {
  const isUpdating = Boolean(initialValues.id);

  const preSubmit: InvoiceFormProps['onSubmit'] = (formData, formActions) => {
    const processedInvoice = extendedInvoiceBuilder(formData);

    onSubmit(processedInvoice, formActions);
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={preSubmit}
      validationSchema={toFormikValidationSchema(InvoiceSchema)}
    >
      {({ isSubmitting }) => (
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
                  required
                />
              </Grid>

              <Grid item xs={1}>
                <FormikTextField
                  size="small"
                  fullWidth
                  name="emission_point"
                  label="Pto."
                  required
                />
              </Grid>

              <Grid item xs={2}>
                <FormikTextField
                  size="small"
                  fullWidth
                  name="sequential_number"
                  label="Nro."
                  required
                />
              </Grid>

              <Grid item xs={5} />

              <Grid item xs={3}>
                <FormikDatePicker
                  size="small"
                  fullWidth
                  name="issue_date"
                  label="Fecha de Emisión"
                  required
                />
              </Grid>

              <Grid item xs={3}>
                <FormikTextField
                  size="small"
                  fullWidth
                  name="issuer_id"
                  label="RUC Emisor"
                  required
                />
              </Grid>

              <Grid item xs={9}>
                <FormikTextField
                  size="small"
                  fullWidth
                  name="issuer_name"
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
                />
              </Grid>

              <Grid item xs={7}>
                <AccountCategorySelector
                  size="small"
                  name="transaction_details[0].account_id"
                  label="Forma de pago"
                  selectableCategories={ALLOWED_ACCOUNTS.INVOICE.PAYMENT}
                  initialValue={DEFAULT_ACCOUNT.INVOICE.PAYMENT}
                  required
                />
              </Grid>

              <Grid item xs={2} />

              <Grid item xs={3}>
                <FormikAutoCalculateField
                  size="small"
                  fullWidth
                  name="taxed_subtotal"
                  label="Base imponible"
                />
              </Grid>

              <Grid item xs={7}>
                <AccountCategorySelector
                  size="small"
                  name="transaction_details[1].account_id"
                  label="Tipo de egreso"
                  selectableCategories={ALLOWED_ACCOUNTS.INVOICE.EXPENSE}
                  initialValue={DEFAULT_ACCOUNT.INVOICE.EXPENSE}
                  required
                />
              </Grid>

              <Grid item xs={2} />

              <Grid item xs={3}>
                <FormikAutoCalculateField
                  size="small"
                  fullWidth
                  name="tax_exempted_subtotal"
                  label="Subtotal 0%"
                />
              </Grid>

              <Grid item xs={9} />

              <Grid item xs={3}>
                <VoucherIVAField />
              </Grid>

              <Grid item xs={7}>
                <VoucherProjectSelector disabled={isUpdating} />
              </Grid>

              <Grid item xs={2} />

              <Grid item xs={3}>
                <VoucherTotalField />
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

export default BaseInvoiceForm;
