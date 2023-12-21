import { useRouter } from 'next/router';
import DashboardLayout from 'src/layouts/dashboard/DashboardLayout';

Page.getLayout = (page: React.ReactElement) => <DashboardLayout>{page}</DashboardLayout>;

export default function Page() {
  const {
    query: { id },
  } = useRouter();

  return <div>{`This is calculation ${id}`}</div>;
}
