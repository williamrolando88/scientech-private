import { LoadingButton } from '@mui/lab';
import {
  Alert,
  Button,
  DialogActions,
  DialogContent,
  Grid,
  Stack,
  Typography,
} from '@mui/material';
import {
  FormikAutoCalculateField,
  FormikDatePicker,
  FormikTextField,
} from '@src/components/shared/formik-components';
import {
  ALLOWED_ACCOUNTS,
  DEFAULT_ACCOUNT,
  TAX_PERCENTAGE_CODES,
} from '@src/lib/constants/settings';
import { extendedInvoiceBuilder } from '@src/lib/modules/expenses';
import { InvoiceSchema } from '@src/lib/schemas/expenses';
import { ExtendedInvoice } from '@src/types/expenses';
import { Form, Formik, FormikConfig, FormikHelpers } from 'formik';
import { FC } from 'react';
import { toFormikValidationSchema } from 'zod-formik-adapter';
import { UploadBox } from '@src/components/shared/upload';
import { xmlFileReader } from '@src/lib/modules/documentParser/documentReader';
import { ParsedInvoice } from '@src/types/documentParsers';
import { parseFactura } from '@src/lib/modules/documentParser/invoiceParser';
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

  const handleOnDropAccepted =
    (setValues: FormikHelpers<ExtendedInvoice>['setValues']) =>
    async (files: File[]) => {
      const documentParsedData = await xmlFileReader<ParsedInvoice>(
        files,
        parseFactura
      );

      if (!documentParsedData || !documentParsedData.length) {
        return;
      }

      const invoice = documentParsedData[0];

      let description = '';
      if (Array.isArray(invoice.detalles.detalle)) {
        description = invoice.detalles.detalle
          .map((detalle) => `${detalle.cantidad} - ${detalle.descripcion}`)
          .join('\n');
      } else {
        description = `${invoice.detalles.detalle.cantidad} - ${invoice.detalles.detalle.descripcion}`;
      }

      const { totalImpuesto } = invoice.infoFactura.totalConImpuestos;

      let taxed_subtotal = 0;
      if (Array.isArray(totalImpuesto)) {
        taxed_subtotal =
          totalImpuesto.find((impuesto) =>
            TAX_PERCENTAGE_CODES.includes(impuesto.codigoPorcentaje)
          )?.baseImponible || 0;
      } else {
        taxed_subtotal = TAX_PERCENTAGE_CODES.includes(
          totalImpuesto.codigoPorcentaje
        )
          ? totalImpuesto.baseImponible
          : 0;
      }

      let tax_exempted_subtotal = 0;
      if (Array.isArray(totalImpuesto)) {
        tax_exempted_subtotal =
          totalImpuesto.find((impuesto) => impuesto.codigoPorcentaje === 0)
            ?.baseImponible || 0;
      } else {
        tax_exempted_subtotal =
          totalImpuesto.codigoPorcentaje === 0
            ? totalImpuesto.baseImponible
            : 0;
      }

      const issue_date = new Date(
        `${invoice.infoFactura.fechaEmision
          .split('/')
          .reverse()
          .join('-')}T12:00:00-05:00`
      );

      setValues({
        ...initialValues,
        description,
        issuer_id: invoice.infoTributaria.ruc,
        issuer_name: invoice.infoTributaria.razonSocial,
        establishment: Number(invoice.infoTributaria.estab),
        emission_point: Number(invoice.infoTributaria.ptoEmi),
        sequential_number: Number(invoice.infoTributaria.secuencial),
        issue_date,
        taxed_subtotal,
        tax_exempted_subtotal,
      });
    };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={preSubmit}
      validationSchema={toFormikValidationSchema(InvoiceSchema)}
    >
      {({ isSubmitting, setValues }) => (
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
                <VoucherProjectSelector />
              </Grid>

              <Grid item xs={2} />

              <Grid item xs={3}>
                <VoucherTotalField />
              </Grid>
            </Grid>
          </Stack>

          <DialogActions
            sx={{ justifyContent: 'space-between', alignItems: 'center' }}
          >
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="center"
              gap={2}
              sx={{ alignSelf: 'flex-start' }}
            >
              <UploadBox
                placeholder={
                  <Typography variant="button" color="primary">
                    Leer XML
                  </Typography>
                }
                accept={{ 'text/xml': [] }}
                sx={{ height: '36px', width: '100%' }}
                onDropAccepted={handleOnDropAccepted(setValues)}
              />
            </Stack>

            <Stack
              direction="row"
              alignItems="center"
              justifyContent="center"
              gap={2}
              sx={{ alignSelf: 'flex-start' }}
            >
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
            </Stack>
          </DialogActions>
        </Form>
      )}
    </Formik>
  );
};

export default BaseInvoiceForm;
