import Reports from '@src/components/dashboard/reports';
import DashboardLayout from 'src/components/shared/layouts/dashboard/DashboardLayout';
import DashboardTemplate from 'src/components/shared/layouts/dashboard/DashboardTemplate';

Page.getLayout = (page: React.ReactElement) => (
  <DashboardLayout>{page}</DashboardLayout>
);

export default function Page() {
  const title = 'Obtener reportes';
  return (
    <DashboardTemplate documentTitle={title} heading={title}>
      <Reports />
    </DashboardTemplate>
  );
}
