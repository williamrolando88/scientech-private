import ReceivedInvoices from '@src/components/dashboard/vouchers/ReceivedInvoices';
import AddReceivedInvoice from '@src/components/dashboard/vouchers/ReceivedInvoices/Invoices/AddReceivedInvoice';
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
      action={<AddReceivedInvoice />}
    >
      <ReceivedInvoices />
    </DashboardTemplate>
  );
}
