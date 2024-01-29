import { ReactElement } from 'react';
import AddAccountCategory from 'src/components/dashboard/accountCategories/AddAccountCategory';
import DashboardLayout from 'src/components/layouts/dashboard/DashboardLayout';
import DashboardTemplate from 'src/components/layouts/dashboard/DashboardTemplate';
import AccountCategoriesIndex from '../../../components/dashboard/accountCategories/AccountCategoriesIndex';

function Page() {
  return (
    <DashboardTemplate
      documentTitle="Cuentas Contables"
      heading="Cuentas Contables"
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
