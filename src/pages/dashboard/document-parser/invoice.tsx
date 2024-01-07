import InvoiceParser from 'src/components/documentParser/InvoiceParser';
import DashboardLayout from 'src/components/layouts/dashboard/DashboardLayout';
import DashboardTemplate from 'src/components/layouts/dashboard/DashboardTemplate';

Page.getLayout = (page: React.ReactElement) => <DashboardLayout>{page}</DashboardLayout>;

function Page() {
  return (
    <DashboardTemplate documentTitle="Leer factura" heading="Leer factura">
      <InvoiceParser />
    </DashboardTemplate>
  );
}

export default Page;
