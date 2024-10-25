import AddInvoiceModal from '@src/components/dashboard/purchases/invoices/AddInvoiceModal';
import InvoiceList from '@src/components/dashboard/purchases/invoices/InvoiceList';
import DashboardLayout from 'src/components/shared/layouts/dashboard/DashboardLayout';
import DashboardTemplate from 'src/components/shared/layouts/dashboard/DashboardTemplate';

Page.getLayout = (page: React.ReactElement) => (
  <DashboardLayout>{page}</DashboardLayout>
);

export default function Page() {
  return (
    <DashboardTemplate
      documentTitle="Facturas Recibidas"
      heading="Facturas Recibidas"
      action={<AddInvoiceModal />}
    >
      <InvoiceList />
    </DashboardTemplate>
  );
}
