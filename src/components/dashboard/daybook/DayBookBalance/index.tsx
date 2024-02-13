import { Card, CardContent, CardHeader } from '@mui/material';
import { FC } from 'react';
import { useListAccountCategories } from 'src/hooks/cache/accountCategories';
import { createAccountsTree } from 'src/lib/modules/dayBook';

const DayBookBalance: FC = () => (
  <>
    <CardHeader title="Balance" />
    <DayBookTreeViewer />
  </>
);

export default DayBookBalance;

const DayBookTreeViewer = () => {
  const { data: accountCategories } = useListAccountCategories();

  const accountsTree = createAccountsTree(accountCategories);

  return (
    <CardContent>
      <Card variant="outlined">
        <pre>
          <code>{JSON.stringify(accountsTree, null, 2)}</code>
        </pre>
      </Card>
    </CardContent>
  );
};
