import DashboardLayout from 'src/components/layouts/dashboard/DashboardLayout';
import DashboardTemplate from 'src/components/layouts/dashboard/DashboardTemplate';

Page.getLayout = (page: React.ReactElement) => <DashboardLayout>{page}</DashboardLayout>;

function Page() {
  return <DashboardTemplate>Here comes a selector</DashboardTemplate>;
}

export default Page;
