import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { PATH_DASHBOARD } from 'src/routes/paths';

const Page = () => {
  const { push } = useRouter();

  useEffect(() => {
    push(PATH_DASHBOARD.scientech.calculator.list);
  });

  return null;
};

export default Page;
