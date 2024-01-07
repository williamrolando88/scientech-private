import DashboardLayout from 'src/components/layouts/dashboard/DashboardLayout';
import DashboardTemplate from 'src/components/layouts/dashboard/DashboardTemplate';

Page.getLayout = (page: React.ReactElement) => <DashboardLayout>{page}</DashboardLayout>;

function Page() {
  return <DashboardTemplate>Bill parser</DashboardTemplate>;
}

export default Page;
