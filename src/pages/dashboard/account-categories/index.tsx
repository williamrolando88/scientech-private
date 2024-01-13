import { LoadingButton } from '@mui/lab';
import { Alert, Button, Card, Grid, Stack, TextField } from '@mui/material';
import { FormikHelpers, useFormik } from 'formik';
import { useSnackbar } from 'notistack';
import { ReactElement, useState } from 'react';
import DashboardLayout from 'src/components/layouts/dashboard/DashboardLayout';
import DashboardTemplate from 'src/components/layouts/dashboard/DashboardTemplate';
import { ACCOUNT_CATEGORY_INITIAL_VALUE } from 'src/lib/constants/accountCategories';
import { AccountCategoryParser } from 'src/lib/parsers/accountCategories';
import { AccountCategories } from 'src/services/firebase/applicationSettings';
import { AccountCategory } from 'src/types/accountCategories';
import { toFormikValidationSchema } from 'zod-formik-adapter';

Page.getLayout = (page: ReactElement) => (
  <DashboardLayout>{page}</DashboardLayout>
);

function Page() {
  const { enqueueSnackbar } = useSnackbar();
  const [accounts, setAccounts] = useState<AccountCategory[]>([]);

  const handleSubmitForm = async (
    formData: AccountCategory,
    actions: FormikHelpers<AccountCategory>
  ) => {
    const isDuplicated = accounts.some((account) => account.id === formData.id);

    if (isDuplicated) {
      actions.setFieldError('id', 'Ya existe una cuenta con ese número');
      return;
    }

    actions.setSubmitting(true);
    const accountsCollection = [...accounts, formData];

    try {
      await AccountCategories.add(accountsCollection);

      setAccounts(accountsCollection);
      actions.resetForm();
    } catch (error) {
      console.error(error);
      enqueueSnackbar('Ocurrió un error al guardar la cuenta', {
        variant: 'error',
      });
    } finally {
      actions.setSubmitting(false);
    }
  };

  const {
    values,
    touched,
    errors,
    isSubmitting,
    handleChange,
    handleSubmit,
    handleReset,
    resetForm,
  } = useFormik<AccountCategory>({
    initialValues: ACCOUNT_CATEGORY_INITIAL_VALUE,
    validationSchema: toFormikValidationSchema(AccountCategoryParser),
    onSubmit: handleSubmitForm,
  });

  return (
    <DashboardTemplate
      documentTitle="Cuentas Contables"
      heading="Cuentas Contables"
    >
      <Card sx={{ p: 2 }}>
        <Stack
          component="form"
          gap={2}
          onSubmit={handleSubmit}
          onReset={handleReset}
        >
          <Alert severity="info">
            Aquí podrás agregar una cuenta contable que estará disponible a
            través de toda la aplicación
          </Alert>

          <Grid container columns={3} columnSpacing={2}>
            <Grid item xs={1}>
              <TextField
                fullWidth
                onFocus={(e) => e.target.select()}
                label="Número de Cuenta"
                onChange={handleChange}
                value={values.id}
                name="id"
                id="id"
                error={touched.id && !!errors.id}
                helperText={touched.id && errors.id}
              />
            </Grid>

            <Grid item xs={2}>
              <TextField
                fullWidth
                onFocus={(e) => e.target.select()}
                label="Nombre"
                onChange={handleChange}
                value={values.name}
                name="name"
                id="name"
                error={touched.name && !!errors.name}
                helperText={touched.name && errors.name}
              />
            </Grid>
          </Grid>

          <Stack direction="row" alignSelf="end" gap={2}>
            <Button
              type="button"
              disabled={isSubmitting}
              onClick={() => resetForm()}
            >
              Limpiar
            </Button>

            <LoadingButton
              variant="contained"
              type="submit"
              loading={isSubmitting}
            >
              Guardar
            </LoadingButton>
          </Stack>
        </Stack>
      </Card>
    </DashboardTemplate>
  );
}

export default Page;
