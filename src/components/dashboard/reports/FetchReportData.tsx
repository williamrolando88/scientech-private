import { LoadingButton } from '@mui/lab';
import { Card, Grid, MenuItem, Stack } from '@mui/material';
import {
  FormikDatePicker,
  FormikTextField,
} from '@src/components/shared/formik-components';
import { useQueryCollection } from '@src/hooks/useQueryCollection';
import { COLLECTIONS } from '@src/services/firestore/collections';
import { Sale } from '@src/types/sale';
import { where } from 'firebase/firestore';
import { Form, Formik, FormikConfig } from 'formik';
import { useSnackbar } from 'notistack';
import { FC } from 'react';
import { z } from 'zod';
import { toFormikValidationSchema } from 'zod-formik-adapter';

interface Props {
  setData: (data: Sale[]) => void;
  setSearchKey: (value: string) => void;
}

const collectionMapping = {
  sale: {
    collection: COLLECTIONS.SALES,
    searchKeys: {
      billingDocument: {
        value: 'billingDocument',
        label: 'Facturas',
        queryKey: 'billingDocument.issueDate',
      },
      withholding: {
        value: 'withholding',
        label: 'Retenciones',
        queryKey: 'withholding.issueDate',
      },
    },
  },
} as const;

const ValidationSchema = z
  .object({
    collection: z.enum(
      Object.keys(collectionMapping) as [keyof typeof collectionMapping]
    ),
    searchKey: z.string(),
    startAt: z.coerce.date(),
    endAt: z.coerce.date(),
  })
  .refine(
    (data) =>
      new Date(data.startAt.toDateString()) <=
      new Date(data.endAt.toDateString()),
    {
      message: 'La fecha de inicio no puede ser mayor a la fecha de fin',
      path: ['startAt'],
    }
  );

type FormType = z.infer<typeof ValidationSchema>;

const initialValues: FormType = {
  collection: 'sale',
  searchKey: '',
  startAt: new Date(),
  endAt: new Date(),
};

const FetchReportData: FC<Props> = ({ setData, setSearchKey }) => {
  const { enqueueSnackbar } = useSnackbar();
  const { queryCollection } = useQueryCollection();

  const handleSubmit: FormikConfig<FormType>['onSubmit'] = (
    values,
    { setSubmitting }
  ) => {
    const { collection, searchKeys } = collectionMapping[values.collection];

    // @ts-expect-error - Assert to string literal
    const { queryKey } = searchKeys[values.searchKey];
    const additionalQueries = [
      where(queryKey, '>=', new Date(values.startAt.setHours(0, 0, 0, 0))),
      where(queryKey, '<=', new Date(values.endAt.setHours(23, 59, 59, 999))),
    ];

    queryCollection({
      collection,
      additionalQueries,
    })
      .then((data) => {
        setData(data as Sale[]);
        setSearchKey(values.searchKey);
      })
      .catch((e) => {
        enqueueSnackbar(`Algo salió mal: ${e.message}`, { variant: 'error' });
        console.error(e);
      })
      .finally(() => {
        setSubmitting(false);
      });
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
                  name="searchKey"
                  size="medium"
                  required
                  label="Información"
                  fullWidth
                >
                  <MenuItem sx={{ fontStyle: 'italic' }} key="void" value="">
                    Elige una opción
                  </MenuItem>
                  {Object.values(
                    collectionMapping[values.collection].searchKeys
                  ).map((field) => (
                    <MenuItem key={field.value} value={field.value}>
                      {field.label}
                    </MenuItem>
                  ))}
                </FormikTextField>
              </Grid>

              <Grid item xs={1}>
                <FormikDatePicker name="startAt" fullWidth label="Desde" />
              </Grid>

              <Grid item xs={1}>
                <FormikDatePicker name="endAt" fullWidth label="Hasta" />
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
