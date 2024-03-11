import { Card, CardContent, Tab, Tabs } from '@mui/material';
import { ExpenseType } from '@src/types/expenses';
import { TabInterface } from '@src/types/shared';
import { startCase } from 'lodash';
import { useRouter } from 'next/router';
import { FC, SyntheticEvent, useState } from 'react';
import { useEffectOnce } from 'usehooks-ts';

const TABS: TabInterface<ExpenseType>[] = [
  {
    value: 'invoice',
    component: <div key="list">List</div>,
  },
  {
    value: 'customs_payment',
    component: <div key="create">Liquidacion aduanera</div>,
  },
  {
    value: 'sale_note',
    component: <div key="create">Notas de venta</div>,
  },
  {
    value: 'non_deductible',
    component: <div key="create">No deducibles</div>,
  },
];

const ReceivedInvoices: FC = () => {
  const router = useRouter();
  const [currentTab, setCurrentTab] = useState<TabInterface<ExpenseType>>(
    TABS[0]
  );

  const pushQueryParam = (type: ExpenseType) => {
    const searchParams = new URLSearchParams();
    searchParams.set('type', type);
    router.push(
      { search: searchParams.toString(), pathname: router.pathname },
      undefined,
      { shallow: true }
    );
  };

  useEffectOnce(() => {
    if (router.query.type) {
      const queriedTab = TABS.find((tab) => tab.value === router.query.type);
      if (queriedTab) {
        setCurrentTab(queriedTab);
      }
    } else {
      pushQueryParam(currentTab.value);
    }
  });

  const handleTabChange = (
    e: SyntheticEvent,
    newTab: TabInterface<ExpenseType>
  ) => {
    setCurrentTab(newTab);

    pushQueryParam(newTab.value);
  };

  return (
    <Card sx={{ minHeight: '20rem' }}>
      <CardContent sx={{ py: 0 }}>
        <Tabs value={currentTab} onChange={handleTabChange}>
          {TABS.map((tab) => (
            <Tab key={tab.value} label={startCase(tab.value)} value={tab} />
          ))}
        </Tabs>
      </CardContent>

      {TABS.map(
        ({ value, component }) => value === currentTab?.value && component
      )}
    </Card>
  );
};

export default ReceivedInvoices;
