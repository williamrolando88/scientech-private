import AddClient from '@src/components/dashboard/clients/AddClient';
import DashboardLayout from 'src/components/shared/layouts/dashboard/DashboardLayout';
import DashboardTemplate from 'src/components/shared/layouts/dashboard/DashboardTemplate';

Page.getLayout = (page: React.ReactElement) => (
  <DashboardLayout>{page}</DashboardLayout>
);

export default function Page() {
  return (
    <DashboardTemplate
      documentTitle="Clientes"
      heading="Clientes"
      action={<AddClient />}
    >
      Clientes
    </DashboardTemplate>
  );
}
