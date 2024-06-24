import DashboardLayout from '@src/components/shared/layouts/dashboard/DashboardLayout';
import DashboardTemplate from '@src/components/shared/layouts/dashboard/DashboardTemplate';

Page.getLayout = (page: React.ReactElement) => (
  <DashboardLayout>{page}</DashboardLayout>
);

export default function Page() {
  return (
    <DashboardTemplate
      documentTitle="Cuentas bancarias"
      heading="Cuentas bancarias"
    >
      TBD
    </DashboardTemplate>
  );
}
