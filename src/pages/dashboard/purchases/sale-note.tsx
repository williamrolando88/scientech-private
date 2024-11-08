import AddSaleNoteModal from '@src/components/dashboard/purchases/SaleNote/AddSaleNoteModal';
import SaleNoteList from '@src/components/dashboard/purchases/SaleNote/SaleNoteList';
import DashboardLayout from 'src/components/shared/layouts/dashboard/DashboardLayout';
import DashboardTemplate from 'src/components/shared/layouts/dashboard/DashboardTemplate';

Page.getLayout = (page: React.ReactElement) => (
  <DashboardLayout>{page}</DashboardLayout>
);

export default function Page() {
  return (
    <DashboardTemplate
      documentTitle="Notas de Venta Recibidas"
      heading="Notas de Venta Recibidas"
      action={<AddSaleNoteModal />}
    >
      <SaleNoteList />
    </DashboardTemplate>
  );
}
