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
import { extendedCustomPaymentBuilder } from '@src/lib/modules/expenses';
import { CustomsPaymentSchema } from '@src/lib/schemas/expenses';
import { ExtendedCustomsPayment } from '@src/types/expenses';
import { Form, Formik, FormikConfig } from 'formik';
import { FC } from 'react';
import { toFormikValidationSchema } from 'zod-formik-adapter';
import { AccountCategorySelector } from '../../Invoices/InvoiceForm/AccountCategorySelector';
import { VoucherProjectSelector } from '../../Invoices/InvoiceForm/VoucherProjectSelector';
import { CustomsPaymentTotalField } from './CustomsPaymentTotalField';

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
  const preSubmit: BaseCustomsPaymentFormProps['onSubmit'] = async (
    formData,
    formActions
  ) => {
    const processedFormData = extendedCustomPaymentBuilder(formData);
    onSubmit(processedFormData, formActions);
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
                  selectableCategories={
                    ALLOWED_ACCOUNTS.CUSTOMS_PAYMENT.PAYMENT
                  }
                  initialValue={DEFAULT_ACCOUNT.CUSTOMS_PAYMENT.PAYMENT}
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
                <VoucherProjectSelector />
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
