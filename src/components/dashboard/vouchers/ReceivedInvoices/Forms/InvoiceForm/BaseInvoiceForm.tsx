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
import { IVA_RATE } from '@src/lib/constants/settings';
import { Invoice } from '@src/types/expenses';
import { Form, Formik, FormikConfig } from 'formik';
import { FC } from 'react';
import { IVAField } from './IVAField';
import { TotalField } from './TotalField';

type FormikProps = Pick<FormikConfig<Invoice>, 'initialValues' | 'onSubmit'>;

interface InvoiceFormProps extends FormikProps {
  onClose: VoidFunction;
  infoText?: string;
}

const BaseInvoiceForm: FC<InvoiceFormProps> = ({
  onClose,
  infoText,
  ...formikProps
  // eslint-disable-next-line arrow-body-style
}) => {
  return (
    <Formik {...formikProps}>
      {({ isSubmitting }) => (
        <Form>
          <Stack component={DialogContent} gap={2}>
            <Alert severity="info">{infoText}</Alert>

            <Grid container columns={12} rowSpacing={1} columnSpacing={2}>
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
                  label="RUC"
                />
              </Grid>

              <Grid item xs={9}>
                <FormikTextField
                  size="small"
                  fullWidth
                  name="issuer_name"
                  label="Emisor"
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

              <Grid item xs={9} />

              <Grid item xs={3}>
                <FormikAutoCalculateField
                  size="small"
                  fullWidth
                  name="taxed_subtotal"
                  label={`Subtotal ${IVA_RATE}%`}
                />
              </Grid>

              <Grid item xs={9} />

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
