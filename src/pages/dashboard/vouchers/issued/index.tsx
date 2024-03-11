import { useRouter } from 'next/router';
import { useEffect } from 'react';
import DashboardLayout from 'src/components/shared/layouts/dashboard/DashboardLayout';
import { PATH_DASHBOARD } from 'src/routes/paths';
import { useEffectOnce } from 'usehooks-ts';

Page.getLayout = (page: React.ReactElement) => (
  <DashboardLayout>{page}</DashboardLayout>
);

export default function Page() {
  const { push, prefetch } = useRouter();

  useEffect(() => {
    push(PATH_DASHBOARD.vouchers.issued.list);
  });

  useEffectOnce(() => {
    prefetch(PATH_DASHBOARD.vouchers.issued.list);
  });

  return null;
}
