import { Stack } from '@mui/material';
import { ReactElement } from 'react';
import AddAccountCategory from 'src/components/dashboard/accountCategories/AddAccountCategory';
import DashboardLayout from 'src/components/layouts/dashboard/DashboardLayout';
import DashboardTemplate from 'src/components/layouts/dashboard/DashboardTemplate';
import ListAccountCategories from '../../../components/dashboard/accountCategories/ListAccountCategories';

Page.getLayout = (page: ReactElement) => (
  <DashboardLayout>{page}</DashboardLayout>
);

function Page() {
  return (
    <DashboardTemplate
      documentTitle="Cuentas Contables"
      heading="Cuentas Contables"
    >
      <Stack gap={4}>
        <AddAccountCategory />

        <ListAccountCategories />
      </Stack>
    </DashboardTemplate>
  );
}

export default Page;
