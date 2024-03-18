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
  FormikDatePicker,
  FormikTextField,
} from '@src/components/shared/formik-components';
import { Invoice } from '@src/types/expenses';
import { Form, Formik, FormikConfig } from 'formik';
import { FC } from 'react';

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

            <Grid container columns={12} spacing={2}>
              <Grid item xs={1}>
                <FormikTextField fullWidth name="establishment" label="Suc." />
              </Grid>

              <Grid item xs={1}>
                <FormikTextField fullWidth name="emission_point" label="Pto." />
              </Grid>

              <Grid item xs={2}>
                <FormikTextField
                  fullWidth
                  name="sequential_number"
                  label="Nro."
                />
              </Grid>

              <Grid item xs={5} />

              <Grid item xs={3}>
                <FormikDatePicker
                  fullWidth
                  name="issuer_date"
                  label="Fecha de Emisión"
                />
              </Grid>

              <Grid item xs={8}>
                <FormikTextField fullWidth name="issuer_name" label="Emisor" />
              </Grid>

              <Grid item xs={4}>
                <FormikTextField fullWidth name="issuer_id" label="RUC" />
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
