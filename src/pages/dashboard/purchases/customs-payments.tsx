import AddCustomsPaymentModal from '@src/components/dashboard/purchases/CustomsPayments/AddCustomsPaymentModal';
import CustomsPaymentsList from '@src/components/dashboard/purchases/CustomsPayments/CustomsPaymentsList';
import DashboardLayout from '@src/components/shared/layouts/dashboard/DashboardLayout';
import DashboardTemplate from '@src/components/shared/layouts/dashboard/DashboardTemplate';

Page.getLayout = (page: React.ReactElement) => (
  <DashboardLayout>{page}</DashboardLayout>
);

export default function Page() {
  return (
    <DashboardTemplate
      documentTitle="Liquidaciones Aduaneras Recibidas"
      heading="Liquidaciones Aduaneras Recibidas"
      action={<AddCustomsPaymentModal />}
    >
      <CustomsPaymentsList />
    </DashboardTemplate>
  );
}
