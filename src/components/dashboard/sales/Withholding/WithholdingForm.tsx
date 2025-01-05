import { LoadingButton } from '@mui/lab';
import {
  Alert,
  Button,
  DialogActions,
  DialogContent,
  Grid,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import {
  FormikAutoCalculateField,
  FormikDatePicker,
  FormikTextField,
} from '@src/components/shared/formik-components';
import { WithholdingSchema } from '@src/lib/schemas/sale';
import { Withholding } from '@src/types/sale';
import { Form, Formik, FormikConfig } from 'formik';
import { FC } from 'react';
import { toFormikValidationSchema } from 'zod-formik-adapter';
import WithholdingTotalField from './WithholdingTotalField';

interface Props
  extends Pick<FormikConfig<Withholding>, 'initialValues' | 'onSubmit'> {
  onClose: VoidFunction;
  invoiceId: string;
  incomeValue: number;
  IVAValue: number;
}

const WithholdingForm: FC<Props> = ({
  initialValues,
  invoiceId,
  IVAValue,
  incomeValue,
  onClose,
  onSubmit,
}) => (
  <Formik
    initialValues={initialValues}
    onSubmit={onSubmit}
    validationSchema={toFormikValidationSchema(WithholdingSchema)}
  >
    {({ isSubmitting, errors }) => (
      <Form>
        <Stack component={DialogContent} gap={2}>
          <Alert severity="info">
            {`Agrega manualmente los datos de la retención efectuada a la factura: ${invoiceId}`}
          </Alert>

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
                disabled
              />
            </Grid>

            <Grid item xs={9}>
              <FormikTextField
                size="small"
                fullWidth
                name="issuerName"
                label="Razón Social Emisor"
                required
                disabled
              />
            </Grid>

            <Grid item xs={12}>
              <Typography variant="subtitle1">Impuesto a la renta</Typography>
            </Grid>

            <Grid item xs={3}>
              <TextField
                fullWidth
                size="small"
                label="Base imponible"
                value={incomeValue}
                disabled
              />
            </Grid>

            <Grid item xs={6} />

            <Grid item xs={3}>
              <FormikAutoCalculateField
                fullWidth
                size="small"
                name="IncomeWithholding"
                label="Retención"
                required
              />
            </Grid>

            <Grid item xs={12}>
              <Typography variant="subtitle1">IVA</Typography>
            </Grid>

            <Grid item xs={3}>
              <TextField
                fullWidth
                size="small"
                label="Base imponible"
                value={IVAValue}
                disabled
              />
            </Grid>

            <Grid item xs={6} />

            <Grid item xs={3}>
              <FormikAutoCalculateField
                fullWidth
                size="small"
                name="IVAWithholding"
                label="Retención"
                required
              />
            </Grid>

            <Grid item xs={9} />

            <Grid item xs={3}>
              <WithholdingTotalField />
            </Grid>
          </Grid>
        </Stack>

        <DialogActions>
          <Button onClick={onClose} type="button">
            Cerrar
          </Button>

          <LoadingButton
            variant="contained"
            loading={isSubmitting}
            type="submit"
          >
            Guardar
          </LoadingButton>
        </DialogActions>
      </Form>
    )}
  </Formik>
);

export default WithholdingForm;
