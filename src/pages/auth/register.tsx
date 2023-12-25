import Head from 'next/head';
import Register from 'src/components/auth/Register';
import GuestGuard from 'src/services/auth/GuestGuard';

export default function RegisterPage() {
  return (
    <>
      <Head>
        <title> Register | Minimal UI</title>
      </Head>

      <GuestGuard>
        <Register />
      </GuestGuard>
    </>
  );
}
