import { Card, CardContent, Tab, Tabs } from '@mui/material';
import { startCase } from 'lodash';
import React, { useState } from 'react';
import AddDayBookTransaction from 'src/components/dashboard/daybook/AddDayBookTransaction';
import DayBookBalance from 'src/components/dashboard/daybook/DayBookBalance';
import DayBookIndex from 'src/components/dashboard/daybook/DayBookIndex';
import DayBookReportByAccount from 'src/components/dashboard/daybook/DayBookReportByAccount';
import DashboardLayout from 'src/components/shared/layouts/dashboard/DashboardLayout';
import DashboardTemplate from 'src/components/shared/layouts/dashboard/DashboardTemplate';
import { DayBookTabs } from 'src/types/dayBook';
import { TabInterface } from 'src/types/shared';

Page.getLayout = (page: React.ReactElement) => (
  <DashboardLayout>{page}</DashboardLayout>
);

function Page() {
  const [currentTab, setCurrentTab] = useState<DayBookTabs>('listado');

  const TABS: TabInterface<DayBookTabs>[] = [
    {
      value: 'listado',
      component: <DayBookIndex key="listado" />,
    },
    {
      value: 'reporte-por-cuenta',
      component: <DayBookReportByAccount key="reporte-por-cuenta" />,
    },
    {
      value: 'balance',
      component: <DayBookBalance key="balance" />,
    },
  ];

  return (
    <DashboardTemplate
      documentTitle="Libro Diario"
      heading="Libro Diario"
      action={<AddDayBookTransaction />}
    >
      <Card sx={{ minHeight: '20rem' }}>
        <CardContent sx={{ py: 0 }}>
          <Tabs
            value={currentTab}
            onChange={(_, newValue) => setCurrentTab(newValue)}
          >
            {TABS.map(({ value }) => (
              <Tab key={value} label={startCase(value)} value={value} />
            ))}
          </Tabs>
        </CardContent>

        {TABS.map(({ value, component }) => value === currentTab && component)}
      </Card>
    </DashboardTemplate>
  );
}

export default Page;
