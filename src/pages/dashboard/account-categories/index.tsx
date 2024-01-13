import { Card, Stack } from '@mui/material';
import { ReactElement } from 'react';
import AddAccountCategory from 'src/components/dashboard/accountCategories/AddAccountCategory';
import DashboardLayout from 'src/components/layouts/dashboard/DashboardLayout';
import DashboardTemplate from 'src/components/layouts/dashboard/DashboardTemplate';
import { useAccountCategoriesStore } from 'src/lib/stores/accountCategories';
import { AccountCategories } from 'src/services/firebase/applicationSettings';
import { useEffectOnce } from 'usehooks-ts';

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

const ListAccountCategories = () => {
  const { categories, setCategories } = useAccountCategoriesStore();

  const fetchAccountCategories = async () => {
    const accountCategories = await AccountCategories.list();

    setCategories(accountCategories);
  };

  useEffectOnce(() => {
    fetchAccountCategories();
  });

  return (
    <Card>
      <pre>{JSON.stringify(categories, null, 2)}</pre>
    </Card>
  );
};
