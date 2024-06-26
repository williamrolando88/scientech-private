import { LoadingButton } from '@mui/lab';
import {
  Alert,
  Button,
  DialogActions,
  DialogContent,
  FormControlLabel,
  Grid,
  Stack,
  Switch,
  TextField,
} from '@mui/material';
import { AccountCategorySchema } from '@src/lib/schemas/accountCategories';
import { FormikConfig, useFormik } from 'formik';
import { FC } from 'react';
import { AccountCategory } from 'src/types/accountCategories';
import { toFormikValidationSchema } from 'zod-formik-adapter';

interface AccountCategoryFormProps {
  initialValues: AccountCategory;
  onSubmit: FormikConfig<AccountCategory>['onSubmit'];
  onClose: VoidFunction;
  multiple?: boolean;
  handleMultiple?: VoidFunction;
  isUpdating?: boolean;
  infoText?: string;
}

export const AccountCategoryForm: FC<AccountCategoryFormProps> = ({
  initialValues,
  onSubmit,
  onClose,
  multiple,
  handleMultiple,
  infoText,
  isUpdating = false,
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
    validationSchema: toFormikValidationSchema(AccountCategorySchema),
    onSubmit,
  });

  return (
    <>
      <DialogContent>
        <Stack
          gap={4}
          component="form"
          onSubmit={handleSubmit}
          onReset={handleReset}
        >
          {infoText && <Alert severity="info">{infoText}</Alert>}

          <Grid container columns={3} columnSpacing={2} rowSpacing={2}>
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
                disabled={isUpdating}
                required
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
                required
              />
            </Grid>
          </Grid>
        </Stack>
      </DialogContent>

      <DialogActions>
        <Stack direction="row" justifyContent="space-between" width="100%">
          {!isUpdating ? (
            <FormControlLabel
              label="Agregar varios"
              control={<Switch checked={multiple} onChange={handleMultiple} />}
            />
          ) : (
            <div />
          )}

          <Stack direction="row" gap={2}>
            <Button type="button" disabled={isSubmitting} onClick={onClose}>
              Cancelar
            </Button>

            {!isUpdating && (
              <Button
                type="button"
                disabled={isSubmitting}
                onClick={() => resetForm()}
                variant="contained"
                color="error"
              >
                Limpiar
              </Button>
            )}

            <LoadingButton
              variant="contained"
              onClick={submitForm}
              loading={isSubmitting}
            >
              Guardar
            </LoadingButton>
          </Stack>
        </Stack>
      </DialogActions>
    </>
  );
};
