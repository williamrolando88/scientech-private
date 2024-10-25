import { Card, CardContent, Tab, Tabs } from '@mui/material';
import { ExpenseTypeValuesOld } from '@src/types/expenses';
import { TabInterface } from '@src/types/shared';
import { useRouter } from 'next/router';
import { FC, SyntheticEvent, useState } from 'react';
import { useEffectOnce } from 'usehooks-ts';
import InvoiceList from '../../purchases/invoices/InvoiceList';
import CustomsPaymentsList from './CustomsPayments/CustomsPaymentsList';
import NonDeductibleList from './NonDeductible/NonDeductibleList';
import SaleNoteList from './SaleNote/SaleNoteList';

const TABS: TabInterface<ExpenseTypeValuesOld>[] = [
  {
    value: 'invoice',
    component: <InvoiceList key="invoice" />,
    label: 'Facturas',
  },
  {
    value: 'non_deductible',
    component: <NonDeductibleList key="non_deductible" />,
    label: 'No deducibles',
  },
  {
    value: 'customs_payment',
    component: <CustomsPaymentsList key="customs_payment" />,
    label: 'Liquidación aduanera',
  },
  {
    value: 'sale_note',
    component: <SaleNoteList key="sale_note" />,
    label: 'Notas de venta',
  },
];

const ReceivedInvoices: FC = () => {
  const router = useRouter();
  const [currentTab, setCurrentTab] = useState<
    TabInterface<ExpenseTypeValuesOld>
  >(TABS[0]);

  const pushQueryParam = (type: ExpenseTypeValuesOld) => {
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
    newTab: TabInterface<ExpenseTypeValuesOld>
  ) => {
    setCurrentTab(newTab);

    pushQueryParam(newTab.value);
  };

  return (
    <Card sx={{ minHeight: '20rem' }}>
      <CardContent sx={{ py: 0 }}>
        <Tabs value={currentTab} onChange={handleTabChange}>
          {TABS.map((tab) => (
            <Tab key={tab.value} label={tab.label} value={tab} />
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
