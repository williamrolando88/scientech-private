import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { PATH_AUTH } from 'src/routes/paths';
import { useEffectOnce } from 'usehooks-ts';

export default function Index() {
  const { pathname, replace, prefetch } = useRouter();

  useEffect(() => {
    if (pathname === '/') {
      replace(PATH_AUTH.login);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  useEffectOnce(() => {
    prefetch(PATH_AUTH.login);
  });

  return null;
}
