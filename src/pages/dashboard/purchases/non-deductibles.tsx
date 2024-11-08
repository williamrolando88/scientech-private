import AddNonDeductibleModal from '@src/components/dashboard/purchases/NonDeductible/AddNonDeductibleModal';
import NonDeductibleList from '@src/components/dashboard/purchases/NonDeductible/NonDeductibleList';
import DashboardLayout from 'src/components/shared/layouts/dashboard/DashboardLayout';
import DashboardTemplate from 'src/components/shared/layouts/dashboard/DashboardTemplate';

Page.getLayout = (page: React.ReactElement) => (
  <DashboardLayout>{page}</DashboardLayout>
);

export default function Page() {
  return (
    <DashboardTemplate
      documentTitle="Gastos no deducibles"
      heading="Gastos no deducibles"
      action={<AddNonDeductibleModal />}
    >
      <NonDeductibleList />
    </DashboardTemplate>
  );
}
