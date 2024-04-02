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
import { CustomsPaymentTotalField } from './VoucherTotalField';

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
    formData.IVA = round(formData.IVA ?? 0, 2);
    formData.FODINFA = round(formData.FODINFA ?? 0, 2);
    formData.specific_tariff = round(formData.specific_tariff ?? 0, 2);
    formData.ad_valorem_tariff = round(formData.ad_valorem_tariff ?? 0, 2);
    formData.total = round(formData.tax_exempted_subtotal ?? 0, 2);

    const transactionDescription = `Liquidación aduanera: ${formData.description}`;
    const [payment, expense, tax] = cloneDeep(formData.transaction_details);

    payment.credit = formData.total;
    payment.debit = 0;
    payment.description = transactionDescription;

    expense.debit =
      formData.FODINFA + formData.ad_valorem_tariff + formData.specific_tariff;
    expense.credit = 0;
    expense.description = transactionDescription;

    tax.account_id = DEFAULT_ACCOUNT.IVA;
    tax.debit = formData.IVA;
    tax.credit = 0;
    tax.description = transactionDescription;

    formData.transaction_details = [payment, expense, tax];

    onSubmit(formData, formActions);
  };
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={preSubmit}
      validationSchema={toFormikValidationSchema(CustomsPaymentSchema)}
    >
      {({ isSubmitting, values }) => (
        <Form>
          <Stack component={DialogContent} gap={2}>
            <Alert severity="info">{infoText}</Alert>

            {console.log(values)}

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
                  required
                />
              </Grid>

              <Grid item xs={9} />

              <Grid item xs={3}>
                <FormikAutoCalculateField
                  size="small"
                  fullWidth
                  name="IVA"
                  label="IVA"
                  required
                />
              </Grid>

              <Grid item xs={7}>
                <VoucherProjectSelector disabled={isUpdating} />
              </Grid>

              <Grid item xs={2} />

              <Grid item xs={3}>
                <CustomsPaymentTotalField />
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
