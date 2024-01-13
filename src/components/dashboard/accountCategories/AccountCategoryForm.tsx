import { LoadingButton } from '@mui/lab';
import {
  Alert,
  Button,
  DialogActions,
  DialogContent,
  Grid,
  Stack,
  TextField,
} from '@mui/material';
import { FormikConfig, useFormik } from 'formik';
import { FC } from 'react';
import { AccountCategoryParser } from 'src/lib/parsers/accountCategories';
import { AccountCategory } from 'src/types/accountCategories';
import { toFormikValidationSchema } from 'zod-formik-adapter';

interface AccountCategoryFormProps {
  initialValues: AccountCategory;
  onSubmit: FormikConfig<AccountCategory>['onSubmit'];
  onClose: VoidFunction;
}
export const AccountCategoryForm: FC<AccountCategoryFormProps> = ({
  initialValues,
  onSubmit,
  onClose,
}) => {
  const {
    values,
    touched,
    errors,
    isSubmitting,
    handleChange,
    handleSubmit,
    handleReset,
    resetForm,
    submitForm,
  } = useFormik<AccountCategory>({
    initialValues,
    validationSchema: toFormikValidationSchema(AccountCategoryParser),
    onSubmit,
  });

  return (
    <>
      <DialogContent>
        <Stack
          gap={2}
          component="form"
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
        </Stack>
      </DialogContent>

      <DialogActions>
        <Button type="button" disabled={isSubmitting} onClick={onClose}>
          Cancelar
        </Button>

        <Button
          type="button"
          disabled={isSubmitting}
          onClick={() => resetForm()}
          variant="contained"
          color="error"
        >
          Limpiar
        </Button>

        <LoadingButton
          variant="contained"
          onClick={submitForm}
          loading={isSubmitting}
        >
          Guardar
        </LoadingButton>
      </DialogActions>
    </>
  );
};
