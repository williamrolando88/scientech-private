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
import { CustomsPaymentSchema } from '@src/lib/schemas/purchases';
import { CustomsPayment } from '@src/types/purchases';
import { Form, Formik, FormikConfig } from 'formik';
import { FC } from 'react';
import { toFormikValidationSchema } from 'zod-formik-adapter';
import { ProjectSelector } from '../../ProjectSelector';
import { CustomsPaymentTotalField } from './CustomsPaymentTotalField';

type FormikProps = Pick<
  FormikConfig<CustomsPayment>,
  'initialValues' | 'onSubmit'
>;

interface BaseCustomsPaymentFormProps extends FormikProps {
  onClose?: VoidFunction;
  infoText?: string;
}

const BaseCustomsPaymentForm: FC<BaseCustomsPaymentFormProps> = ({
  onClose,
  infoText,
  initialValues,
  onSubmit,
}) => (
  <Formik
    initialValues={initialValues}
    onSubmit={onSubmit}
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
                name="customsPaymentNumber"
                label="No. de liquidación"
                required
              />
            </Grid>

            <Grid item xs={6} />

            <Grid item xs={3}>
              <FormikDatePicker
                size="small"
                fullWidth
                name="issueDate"
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

            <Grid item xs={9} />

            <Grid item xs={3}>
              <FormikAutoCalculateField
                size="small"
                fullWidth
                name="adValoremTariff"
                label="Arancel Ad Valorem"
                disabled={values.paid}
              />
            </Grid>

            <Grid item xs={9} />

            <Grid item xs={3}>
              <FormikAutoCalculateField
                size="small"
                fullWidth
                name="specificTariff"
                label="Arancel Específico"
                disabled={values.paid}
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
                disabled={values.paid}
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
                disabled={values.paid}
              />
            </Grid>

            <Grid item xs={7}>
              <ProjectSelector disabled={values.paid} />
            </Grid>

            <Grid item xs={2} />

            <Grid item xs={3}>
              <CustomsPaymentTotalField />
            </Grid>
          </Grid>
        </Stack>

        <DialogActions>
          <Button onClick={onClose} disabled={isSubmitting}>
            {values.paid ? 'Cerrar' : 'Cancelar'}
          </Button>

          {!values.paid && (
            <LoadingButton
              variant="contained"
              type="submit"
              loading={isSubmitting}
            >
              Guardar
            </LoadingButton>
          )}
        </DialogActions>
      </Form>
    )}
  </Formik>
);

export default BaseCustomsPaymentForm;
