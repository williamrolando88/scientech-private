import ReceivedInvoices from '@src/components/dashboard/vouchers/ReceivedInvoices';
import AddReceivedVoucher from '@src/components/dashboard/vouchers/ReceivedInvoices/AddReceivedVoucher';
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
      action={<AddReceivedVoucher />}
    >
      <ReceivedInvoices />
    </DashboardTemplate>
  );
}
