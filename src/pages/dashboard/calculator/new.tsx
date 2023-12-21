import DashboardLayout from 'src/layouts/dashboard/DashboardLayout';

Page.getLayout = (page: React.ReactElement) => <DashboardLayout>{page}</DashboardLayout>;

export default function Page() {
  return <div>Page</div>;
}
