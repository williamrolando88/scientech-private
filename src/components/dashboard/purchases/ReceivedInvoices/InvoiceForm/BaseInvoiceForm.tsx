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
import { UploadBox } from '@src/components/shared/upload';
import {
  ALLOWED_ACCOUNTS,
  DEFAULT_ACCOUNT,
  TAX_PERCENTAGE_CODES,
} from '@src/lib/constants/settings';
import { xmlFileReader } from '@src/lib/modules/documentParser/documentReader';
import { parseFactura } from '@src/lib/modules/documentParser/invoiceParser';
import { ReceivedInvoiceSchema } from '@src/lib/schemas/purchases';
import { ParsedInvoice } from '@src/types/documentParsers';
import { ReceivedInvoice } from '@src/types/purchases';
import { Form, Formik, FormikConfig, FormikHelpers } from 'formik';
import { FC } from 'react';
import { toFormikValidationSchema } from 'zod-formik-adapter';
import { AccountCategorySelector } from '../../AccountCategorySelector';
import { ProjectSelector } from '../../ProjectSelector';
import { IVAField } from './IVAField';
import { TotalField } from './TotalField';

type FormikProps = Pick<
  FormikConfig<ReceivedInvoice>,
  'initialValues' | 'onSubmit'
>;

export interface InvoiceFormProps extends FormikProps {
  onClose?: VoidFunction;
  infoText?: string;
}

const BaseInvoiceForm: FC<InvoiceFormProps> = ({
  onClose,
  infoText,
  initialValues,
  onSubmit,
}) => {
  const isUpdating = Boolean(initialValues.id);

  const handleOnDropAccepted =
    (setValues: FormikHelpers<ReceivedInvoice>['setValues']) =>
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

      let taxedSubtotal = 0;
      if (Array.isArray(totalImpuesto)) {
        taxedSubtotal =
          totalImpuesto.find((impuesto) =>
            TAX_PERCENTAGE_CODES.includes(impuesto.codigoPorcentaje)
          )?.baseImponible || 0;
      } else {
        taxedSubtotal = TAX_PERCENTAGE_CODES.includes(
          totalImpuesto.codigoPorcentaje
        )
          ? totalImpuesto.baseImponible
          : 0;
      }

      let noTaxSubtotal = 0;
      if (Array.isArray(totalImpuesto)) {
        noTaxSubtotal =
          totalImpuesto.find((impuesto) => impuesto.codigoPorcentaje === 0)
            ?.baseImponible || 0;
      } else {
        noTaxSubtotal =
          totalImpuesto.codigoPorcentaje === 0
            ? totalImpuesto.baseImponible
            : 0;
      }

      const issueDate = new Date(
        `${invoice.infoFactura.fechaEmision
          .split('/')
          .reverse()
          .join('-')}T12:00:00-05:00`
      );

      setValues({
        ...initialValues,
        description,
        issuerId: invoice.infoTributaria.ruc,
        issuerName: invoice.infoTributaria.razonSocial,
        establishment: Number(invoice.infoTributaria.estab),
        emissionPoint: Number(invoice.infoTributaria.ptoEmi),
        sequentialNumber: Number(invoice.infoTributaria.secuencial),
        issueDate,
        taxedSubtotal,
        noTaxSubtotal,
      });
    };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={toFormikValidationSchema(ReceivedInvoiceSchema)}
    >
      {({ isSubmitting, setValues }) => (
        <Form>
          <Stack component={DialogContent} gap={2}>
            <Alert severity="info">{infoText}</Alert>

            <Grid container columns={12} spacing={2}>
              <Grid item xs={1}>
                <FormikTextField
                  fullWidth
                  name="establishment"
                  label="Suc."
                  type="number"
                  required
                />
              </Grid>

              <Grid item xs={1}>
                <FormikTextField
                  fullWidth
                  name="emissionPoint"
                  label="Pto."
                  type="number"
                  required
                />
              </Grid>

              <Grid item xs={2}>
                <FormikTextField
                  fullWidth
                  name="sequentialNumber"
                  label="Nro."
                  type="number"
                  required
                />
              </Grid>

              <Grid item xs={5} />

              <Grid item xs={3}>
                <FormikDatePicker
                  fullWidth
                  name="issueDate"
                  label="Fecha de Emisión"
                  required
                />
              </Grid>

              <Grid item xs={3}>
                <FormikTextField
                  fullWidth
                  name="issuerId"
                  label="RUC Emisor"
                  required
                />
              </Grid>

              <Grid item xs={9}>
                <FormikTextField
                  fullWidth
                  name="issuerName"
                  label="Razón Social Emisor"
                  required
                />
              </Grid>

              <Grid item xs={12}>
                <FormikTextField
                  multiline
                  rows={3}
                  fullWidth
                  name="description"
                  label="Descripción"
                />
              </Grid>

              <Grid item xs={12}>
                <AccountCategorySelector
                  label="Cuenta de gasto"
                  name="expenseAccount"
                  selectableCategories={ALLOWED_ACCOUNTS.INVOICE.EXPENSE}
                  initialValue={DEFAULT_ACCOUNT.INVOICE.EXPENSE}
                  required
                />
              </Grid>

              <Grid item xs={9} />

              <Grid item xs={3}>
                <FormikAutoCalculateField
                  fullWidth
                  name="taxedSubtotal"
                  label="Base imponible"
                  size="small"
                />
              </Grid>

              <Grid item xs={9} />

              <Grid item xs={3}>
                <FormikAutoCalculateField
                  fullWidth
                  name="noTaxSubtotal"
                  label="Subtotal 0%"
                  size="small"
                />
              </Grid>

              <Grid item xs={9} />

              <Grid item xs={3}>
                <IVAField />
              </Grid>

              <Grid item xs={7}>
                <ProjectSelector />
              </Grid>

              <Grid item xs={2} />

              <Grid item xs={3}>
                <TotalField />
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
