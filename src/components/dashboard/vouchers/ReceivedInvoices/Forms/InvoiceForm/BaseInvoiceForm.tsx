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
import {
  DEFAULT_EXPENSE_ACCOUNT,
  DEFAULT_IVA_ACCOUNT,
  DEFAULT_PAYMENT_ACCOUNT,
  EXPENSE_ALLOWED_ACCOUNTS,
  IVA_RATE,
  PAYMENT_ALLOWED_ACCOUNTS,
} from '@src/lib/constants/settings';
import { InvoiceSchema } from '@src/lib/schemas/expenses';
import { ExtendedInvoice } from '@src/types/expenses';
import { Form, Formik, FormikConfig } from 'formik';
import { FC } from 'react';
import { toFormikValidationSchema } from 'zod-formik-adapter';
import { AccountCategorySelector } from './AccountCategorySelector';
import { IVAField } from './IVAField';
import { TotalField } from './TotalField';

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
  const preSubmit: InvoiceFormProps['onSubmit'] = (formData, formActions) => {
    const transactionDescription = `${formData.issuer_id}-${formData.description}`;
    const [payment, expense, tax] = formData.transaction_details;

    payment.credit = formData.total;
    payment.description = transactionDescription;

    expense.debit =
      (formData.taxed_subtotal ?? 0) + (formData.tax_exempted_subtotal ?? 0);
    expense.description = transactionDescription;

    tax.account_id = DEFAULT_IVA_ACCOUNT;
    tax.debit = formData.IVA;
    tax.description = transactionDescription;

    formData.transaction_details = [payment, expense, tax];

    onSubmit(formData, formActions);
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
                />
              </Grid>

              <Grid item xs={1}>
                <FormikTextField
                  size="small"
                  fullWidth
                  name="emission_point"
                  label="Pto."
                />
              </Grid>

              <Grid item xs={2}>
                <FormikTextField
                  size="small"
                  fullWidth
                  name="sequential_number"
                  label="Nro."
                />
              </Grid>

              <Grid item xs={5} />

              <Grid item xs={3}>
                <FormikDatePicker
                  size="small"
                  fullWidth
                  name="issuer_date"
                  label="Fecha de Emisión"
                />
              </Grid>

              <Grid item xs={3}>
                <FormikTextField
                  size="small"
                  fullWidth
                  name="issuer_id"
                  label="RUC Emisor"
                />
              </Grid>

              <Grid item xs={9}>
                <FormikTextField
                  size="small"
                  fullWidth
                  name="issuer_name"
                  label="Razón Social Emisor"
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
                  selectableCategories={PAYMENT_ALLOWED_ACCOUNTS}
                  initialValue={DEFAULT_PAYMENT_ACCOUNT}
                />
              </Grid>

              <Grid item xs={2} />

              <Grid item xs={3}>
                <FormikAutoCalculateField
                  size="small"
                  fullWidth
                  name="taxed_subtotal"
                  label={`Subtotal ${IVA_RATE}%`}
                />
              </Grid>

              <Grid item xs={7}>
                <AccountCategorySelector
                  size="small"
                  name="transaction_details[1].account_id"
                  label="Tipo de egreso"
                  selectableCategories={EXPENSE_ALLOWED_ACCOUNTS}
                  initialValue={DEFAULT_EXPENSE_ACCOUNT}
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
                <IVAField />
              </Grid>

              <Grid item xs={9} />

              <Grid item xs={3}>
                <TotalField />
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
};

export default BaseInvoiceForm;
