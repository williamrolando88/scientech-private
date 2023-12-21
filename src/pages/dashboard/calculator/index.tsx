import { useRouter } from 'next/router';
import { useEffect } from 'react';
import DashboardLayout from 'src/layouts/dashboard/DashboardLayout';
import { PATH_DASHBOARD } from 'src/routes/paths';

Page.getLayout = (page: React.ReactElement) => <DashboardLayout>{page}</DashboardLayout>;

export default function Page() {
  const { push } = useRouter();

  useEffect(() => {
    push(PATH_DASHBOARD.scientech.calculator.list);
  });

  return null;
}
