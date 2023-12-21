import DashboardTemplate from 'src/components/shared/DashboardTemplate';
import DashboardLayout from 'src/layouts/dashboard/DashboardLayout';

Page.getLayout = (page: React.ReactElement) => <DashboardLayout>{page}</DashboardLayout>;

export default function Page() {
  const title = 'Dashboard';
  return <DashboardTemplate>{title}</DashboardTemplate>;
}
