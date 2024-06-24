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
import { extendedNonDeductibleBuilder } from '@src/lib/modules/expenses';
import { ExpensesCommonSchema } from '@src/lib/schemas/expenses';
import { ExtendedExpense } from '@src/types/expenses';
import { Form, Formik, FormikConfig } from 'formik';
import { FC } from 'react';
import { toFormikValidationSchema } from 'zod-formik-adapter';
import { AccountCategorySelector } from '../../Invoices/InvoiceForm/AccountCategorySelector';
import { VoucherProjectSelector } from '../../Invoices/InvoiceForm/VoucherProjectSelector';
import { VoucherTotalField } from '../../Invoices/InvoiceForm/VoucherTotalField';

type FormikProps = Pick<
  FormikConfig<ExtendedExpense>,
  'initialValues' | 'onSubmit'
>;

export interface BaseNonDeductibleFormProps extends FormikProps {
  onClose: VoidFunction;
  infoText?: string;
}

const BaseNonDeductibleForm: FC<BaseNonDeductibleFormProps> = ({
  onClose,
  infoText,
  initialValues,
  onSubmit,
}) => {
  const isUpdating = Boolean(initialValues.id);

  const preSubmit: BaseNonDeductibleFormProps['onSubmit'] = (
    formData,
    formActions
  ) => {
    const processedData = extendedNonDeductibleBuilder(formData);

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
                  name="tax_exempted_subtotal"
                  label="Subtotal"
                />
              </Grid>

              <Grid item xs={7}>
                <AccountCategorySelector
                  size="small"
                  name="transaction_details[1].account_id"
                  label="Tipo de egreso"
                  selectableCategories={ALLOWED_ACCOUNTS.NON_DEDUCTIBLE.EXPENSE}
                  initialValue={DEFAULT_ACCOUNT.NON_DEDUCTIBLE.EXPENSE}
                  required
                />
              </Grid>

              <Grid item xs={2} />

              <Grid item xs={3}>
                <VoucherTotalField />
              </Grid>

              <Grid item xs={7}>
                <VoucherProjectSelector />
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

export default BaseNonDeductibleForm;
