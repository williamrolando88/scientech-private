import { useRouter } from 'next/router';
import { useEffect } from 'react';
import LoadingScreen from 'src/components/shared/loading-screen';
import { PATH_DASHBOARD } from 'src/routes/paths';
import { useAuthContext } from './useAuthContext';

type GuestGuardProps = {
  children: React.ReactNode;
};

export default function GuestGuard({ children }: GuestGuardProps) {
  const { push } = useRouter();

  const { isAuthenticated, isInitialized } = useAuthContext();

  useEffect(() => {
    if (isAuthenticated) {
      push(PATH_DASHBOARD.root);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated]);

  if (isInitialized === isAuthenticated) {
    return <LoadingScreen />;
  }

  return <>{children}</>;
}
