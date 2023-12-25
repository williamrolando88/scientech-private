import DashboardLayout from 'src/components/layouts/dashboard/DashboardLayout';
import DashboardTemplate from 'src/components/layouts/dashboard/DashboardTemplate';

Page.getLayout = (page: React.ReactElement) => <DashboardLayout>{page}</DashboardLayout>;

export default function Page() {
  return (
    <DashboardTemplate documentTitle="Calcular Importación" heading="Calculadora de Importaciones">
      Page
    </DashboardTemplate>
  );
}
