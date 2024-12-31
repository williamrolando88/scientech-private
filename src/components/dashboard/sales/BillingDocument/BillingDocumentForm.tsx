import { LoadingButton } from '@mui/lab';
import {
  Alert,
  AlertColor,
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
import { BillingDocumentSchema } from '@src/lib/schemas/sale';
import { BillingDocument } from '@src/types/sale';
import { Form, Formik, FormikConfig } from 'formik';
import { FC } from 'react';
import { toFormikValidationSchema } from 'zod-formik-adapter';
import { AccountCategorySelector } from '../../purchases/AccountCategorySelector';
import { ProjectSelector } from '../../purchases/ProjectSelector';

const MISSING_SALE_ACCOUNT =
  'Es necesario actualizar la informacion de Proyecto relacionado y Cuenta contable';
const DEFAULT_MESSAGE =
  'Los datos presentados fueron extraidos directamente del XML generado, no estan disponibles para edicion';

type FormikProps = Pick<
  FormikConfig<BillingDocument>,
  'initialValues' | 'onSubmit'
>;

interface Props extends FormikProps {
  onClose: VoidFunction;
}

const BillingDocumentForm: FC<Props> = ({
  initialValues,
  onSubmit,
  onClose,
}) => {
  const alertParams: { text: string; severity: AlertColor } =
    initialValues.saleAccount === DEFAULT_ACCOUNT.INCOME_ROOT
      ? { text: MISSING_SALE_ACCOUNT, severity: 'warning' }
      : { text: DEFAULT_MESSAGE, severity: 'info' };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={toFormikValidationSchema(BillingDocumentSchema)}
    >
      {({ isSubmitting }) => (
        <Form>
          <Stack component={DialogContent} gap={2}>
            <Alert severity={alertParams.severity}>{alertParams.text}</Alert>

            <Grid container columns={12} spacing={2}>
              <Grid item xs={1}>
                <FormikTextField
                  size="small"
                  fullWidth
                  name="establishment"
                  label="Suc."
                  type="number"
                  required
                  disabled
                />
              </Grid>

              <Grid item xs={1}>
                <FormikTextField
                  size="small"
                  fullWidth
                  name="emissionPoint"
                  label="Pto."
                  type="number"
                  required
                  disabled
                />
              </Grid>

              <Grid item xs={2}>
                <FormikTextField
                  size="small"
                  fullWidth
                  name="sequentialNumber"
                  label="Nro."
                  type="number"
                  required
                  disabled
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
                  disabled
                />
              </Grid>

              <Grid item xs={3}>
                <FormikTextField
                  size="small"
                  fullWidth
                  name="recipientId"
                  label="CI/RUC Emisor"
                  required
                  disabled
                />
              </Grid>

              <Grid item xs={9}>
                <FormikTextField
                  size="small"
                  fullWidth
                  name="recipientName"
                  label="Razón Social Emisor"
                  required
                  disabled
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
                  disabled
                />
              </Grid>

              <Grid item xs={12}>
                <AccountCategorySelector
                  size="small"
                  label="Cuenta de venta"
                  name="saleAccount"
                  selectableCategories={ALLOWED_ACCOUNTS.ISSUED_INVOICES}
                  initialValue={DEFAULT_ACCOUNT.ISSUED_INVOICE}
                  required
                />
              </Grid>

              <Grid item xs={9} />

              <Grid item xs={3}>
                <FormikAutoCalculateField
                  size="small"
                  fullWidth
                  name="taxedSubtotal"
                  label="Base Imponible"
                  required
                  disabled
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
                  disabled
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
                  disabled
                />
              </Grid>
            </Grid>
          </Stack>

          <DialogActions>
            <Button type="button" onClick={onClose}>
              Cerrar
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

export default BillingDocumentForm;
