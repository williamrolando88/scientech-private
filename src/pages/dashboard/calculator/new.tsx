import DashboardLayout from 'src/layouts/dashboard/DashboardLayout';
import DashboardTemplate from 'src/layouts/dashboard/DashboardTemplate';

Page.getLayout = (page: React.ReactElement) => <DashboardLayout>{page}</DashboardLayout>;

export default function Page() {
  return <DashboardTemplate>Page</DashboardTemplate>;
}
