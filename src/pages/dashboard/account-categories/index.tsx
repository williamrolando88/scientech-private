import { ReactElement } from 'react';
import AddAccountCategory from 'src/components/dashboard/accountCategories/AddAccountCategory';
import DashboardLayout from 'src/components/shared/layouts/dashboard/DashboardLayout';
import DashboardTemplate from 'src/components/shared/layouts/dashboard/DashboardTemplate';
import AccountCategoriesIndex from '../../../components/dashboard/accountCategories/AccountCategoriesIndex';

function Page() {
  return (
    <DashboardTemplate
      documentTitle="Administrador de Cuentas Contables"
      heading="Administrador de Cuentas Contables"
      action={<AddAccountCategory />}
    >
      <AccountCategoriesIndex />
    </DashboardTemplate>
  );
}

Page.getLayout = (page: ReactElement) => (
  <DashboardLayout>{page}</DashboardLayout>
);

export default Page;
