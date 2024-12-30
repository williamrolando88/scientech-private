import AddSalesDocument from '@src/components/dashboard/sales/BillingDocument/AddSalesDocument';
import DashboardLayout from '@src/components/shared/layouts/dashboard';
import DashboardTemplate from '@src/components/shared/layouts/dashboard/DashboardTemplate';

Page.getLayout = (page: React.ReactElement) => (
  <DashboardLayout>{page}</DashboardLayout>
);

export default function Page() {
  return (
    <DashboardTemplate
      documentTitle="Facturas Recibidas"
      heading="Facturas Recibidas"
      action={<AddSalesDocument />}
    >
      Here comes the issued invoices
    </DashboardTemplate>
  );
}
