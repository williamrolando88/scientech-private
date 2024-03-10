import { LoadingButton } from '@mui/lab';
import { IconButton, InputAdornment, Stack } from '@mui/material';
import { LoginSchema } from '@src/lib/schemas/auth';
import { Form, Formik, FormikConfig } from 'formik';
import { useState } from 'react';
import { LOGIN_INITIAL_VALUES } from 'src/lib/constants/auth';
import { useAuthContext } from 'src/services/auth/useAuthContext';
import { LoginForm } from 'src/types/auth';
import { toFormikValidationSchema } from 'zod-formik-adapter';
import CollapsibleAlert from '../shared/CollapsibleAlert';
import { FormikTextField } from '../shared/formik-components';
import Iconify from '../shared/iconify';

export default function AuthLoginForm() {
  const { login } = useAuthContext();
  const [showPassword, setShowPassword] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [showError, setShowError] = useState(false);

  const onSubmit: FormikConfig<LoginForm>['onSubmit'] = async (
    data,
    { resetForm }
  ) => {
    try {
      await login(data.email, data.password);
    } catch (error) {
      console.error(error);
      setSubmitError(error.message);
      setShowError(true);
    } finally {
      resetForm();
    }
  };

  return (
    <Formik
      initialValues={LOGIN_INITIAL_VALUES}
      validationSchema={toFormikValidationSchema(LoginSchema)}
      onSubmit={onSubmit}
    >
      {({ isSubmitting }) => (
        <Stack component={Form} spacing={3}>
          <CollapsibleAlert
            open={showError}
            onClose={() => setShowError(false)}
            severity="error"
          >
            {submitError}
          </CollapsibleAlert>

          <FormikTextField name="email" label="Email address" />

          <FormikTextField
            name="password"
            label="Password"
            type={showPassword ? 'text' : 'password'}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    edge="end"
                  >
                    <Iconify
                      icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'}
                    />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <LoadingButton
            fullWidth
            color="inherit"
            size="large"
            type="submit"
            variant="contained"
            loading={isSubmitting}
            sx={{
              bgcolor: 'text.primary',
              color: (theme) =>
                theme.palette.mode === 'light' ? 'common.white' : 'grey.800',
              '&:hover': {
                bgcolor: 'text.primary',
                color: (theme) =>
                  theme.palette.mode === 'light' ? 'common.white' : 'grey.800',
              },
            }}
          >
            Login
          </LoadingButton>
        </Stack>
      )}
    </Formik>
  );
}
