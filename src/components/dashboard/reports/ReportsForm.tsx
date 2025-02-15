import { LoadingButton } from '@mui/lab';
import { Card, Grid, MenuItem, Stack } from '@mui/material';
import {
  FormikDatePicker,
  FormikTextField,
} from '@src/components/shared/formik-components';
import { Purchase } from '@src/types/purchases';
import { Sale } from '@src/types/sale';
import { Form, Formik, FormikConfig } from 'formik';
import { FC } from 'react';
import { z } from 'zod';
import { toFormikValidationSchema } from 'zod-formik-adapter';

interface Props {
  setData: (data: Sale[] | Purchase[]) => void;
}

const ValidationSchema = z.object({
  collection: z.enum(['sale']),
  data: z.string(),
  startAt: z.coerce.date(),
  endAt: z.coerce.date(),
});

type FormType = z.infer<typeof ValidationSchema>;

const initialValues: FormType = {
  collection: 'sale',
  data: '',
  startAt: new Date(),
  endAt: new Date(),
};

const dataAvailable = {
  sale: [
    { value: 'invoices', label: 'Facturas' },
    { value: 'withholding', label: 'Retenciones' },
  ],
};

const FetchReportData: FC = () => {
  const handleSubmit: FormikConfig<FormType>['onSubmit'] = (
    values,
    { setSubmitting }
  ) => {
    console.log('values', values);

    setSubmitting(false);
  };

  return (
    <Card sx={{ p: 4 }}>
      <Formik
        initialValues={initialValues}
        validationSchema={toFormikValidationSchema(ValidationSchema)}
        onSubmit={handleSubmit}
      >
        {({ values }) => (
          <Stack component={Form} gap={4}>
            <Grid container columns={2} spacing={4}>
              <Grid item xs={1}>
                <FormikTextField
                  select
                  name="collection"
                  size="medium"
                  required
                  label="Collección"
                  fullWidth
                >
                  <MenuItem value="sale">Ventas</MenuItem>
                </FormikTextField>
              </Grid>

              <Grid item xs={1}>
                <FormikTextField
                  select
                  name="data"
                  size="medium"
                  required
                  label="Información"
                  fullWidth
                >
                  <MenuItem sx={{ fontStyle: 'italic' }} key="void" value="">
                    Elige una opción
                  </MenuItem>
                  {dataAvailable[values.collection].map((field) => (
                    <MenuItem key={field.value} value={field.value}>
                      {field.label}
                    </MenuItem>
                  ))}
                </FormikTextField>
              </Grid>

              <Grid item xs={1}>
                <FormikDatePicker name="startAt" fullWidth />
              </Grid>

              <Grid item xs={1}>
                <FormikDatePicker name="endAt" fullWidth />
              </Grid>
            </Grid>

            <LoadingButton
              type="submit"
              variant="contained"
              sx={{ alignSelf: 'end' }}
            >
              Buscar
            </LoadingButton>
          </Stack>
        )}
      </Formik>
    </Card>
  );
};

export default FetchReportData;
