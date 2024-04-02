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
import { CustomsPaymentSchema } from '@src/lib/schemas/expenses';
import { ExtendedCustomsPayment } from '@src/types/expenses';
import { Form, Formik, FormikConfig } from 'formik';
import { cloneDeep } from 'lodash';
import { round } from 'mathjs';
import { FC } from 'react';
import { toFormikValidationSchema } from 'zod-formik-adapter';
import { AccountCategorySelector } from '../../Invoices/InvoiceForm/AccountCategorySelector';
import { VoucherProjectSelector } from '../../Invoices/InvoiceForm/VoucherProjectSelector';
import { VoucherTotalField } from '../../Invoices/InvoiceForm/VoucherTotalField';

type FormikProps = Pick<
  FormikConfig<ExtendedCustomsPayment>,
  'initialValues' | 'onSubmit'
>;

interface BaseCustomsPaymentFormProps extends FormikProps {
  onClose: VoidFunction;
  infoText?: string;
}

const BaseCustomsPaymentForm: FC<BaseCustomsPaymentFormProps> = ({
  onClose,
  infoText,
  initialValues,
  onSubmit,
}) => {
  const isUpdating = Boolean(initialValues.id);

  const preSubmit: BaseCustomsPaymentFormProps['onSubmit'] = (
    formData,
    formActions
  ) => {
    formData.tax_exempted_subtotal = round(
      formData.tax_exempted_subtotal ?? 0,
      2
    );

    formData.total = round(formData.tax_exempted_subtotal ?? 0, 2);

    const transactionDescription = `Gasto no deducible: ${formData.issuer_name} ${formData.description}`;
    const [payment, expense] = cloneDeep(formData.transaction_details);

    payment.credit = formData.total;
    payment.debit = 0;
    payment.description = transactionDescription;

    expense.debit = formData.tax_exempted_subtotal;
    expense.credit = 0;
    expense.description = transactionDescription;

    formData.transaction_details = [payment, expense];

    onSubmit(formData, formActions);
  };
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={preSubmit}
      validationSchema={toFormikValidationSchema(CustomsPaymentSchema)}
    >
      {({ isSubmitting }) => (
        <Form>
          <Stack component={DialogContent} gap={2}>
            <Alert severity="info">{infoText}</Alert>

            <Grid container columns={12} spacing={2}>
              <Grid item xs={3}>
                <FormikTextField
                  size="small"
                  fullWidth
                  name="customs_payment_number"
                  label="No. de liquidación"
                  required
                />
              </Grid>

              <Grid item xs={6} />

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
                  selectableCategories={ALLOWED_ACCOUNTS.NON_DEDUCTIBLE.PAYMENT}
                  initialValue={DEFAULT_ACCOUNT.NON_DEDUCTIBLE.PAYMENT}
                  required
                />
              </Grid>

              <Grid item xs={2} />

              <Grid item xs={3}>
                <FormikAutoCalculateField
                  size="small"
                  fullWidth
                  name="ad_valorem_tariff"
                  label="Arancel Ad Valorem"
                />
              </Grid>

              <Grid item xs={9} />

              <Grid item xs={3}>
                <FormikAutoCalculateField
                  size="small"
                  fullWidth
                  name="specific_tariff"
                  label="Arancel Específico"
                />
              </Grid>

              <Grid item xs={9} />

              <Grid item xs={3}>
                <FormikAutoCalculateField
                  size="small"
                  fullWidth
                  name="FODINFA"
                  label="FODINFA"
                />
              </Grid>

              <Grid item xs={9} />

              <Grid item xs={3}>
                <FormikAutoCalculateField
                  size="small"
                  fullWidth
                  name="IVA"
                  label="IVA"
                />
              </Grid>

              <Grid item xs={7}>
                <VoucherProjectSelector disabled={isUpdating} />
              </Grid>

              <Grid item xs={2} />

              <Grid item xs={3}>
                <VoucherTotalField
                  fields={[
                    'ad_valorem_tariff',
                    'specific_tariff',
                    'FODINFA',
                    'IVA',
                  ]}
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
};

export default BaseCustomsPaymentForm;
