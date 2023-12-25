import Head from 'next/head';
import Login from 'src/components/auth/Login';
import GuestGuard from 'src/services/auth/GuestGuard';

export default function LoginPage() {
  return (
    <>
      <Head>
        <title> Login | Minimal UI</title>
      </Head>

      <GuestGuard>
        <Login />
      </GuestGuard>
    </>
  );
}
