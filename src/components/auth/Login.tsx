import { Typography } from '@mui/material';
import LoginLayout from '../shared/layouts/login/LoginLayout';
import AuthLoginForm from './AuthLoginForm';

export default function Login() {
  return (
    <LoginLayout>
      <Typography variant="h4">Sign in to Scientech</Typography>

      <AuthLoginForm />
    </LoginLayout>
  );
}
