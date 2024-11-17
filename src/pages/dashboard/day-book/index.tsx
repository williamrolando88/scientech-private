import { Card, CardContent, Tab, Tabs } from '@mui/material';
import { startCase } from 'lodash';
import React, { useState } from 'react';
import AddDayBookTransaction from 'src/components/dashboard/daybook/AddDayBookTransaction';
import DayBookIndex from 'src/components/dashboard/daybook/DayBookIndex';
import DayBookReportByAccount from 'src/components/dashboard/daybook/DayBookReportByAccount';
import DashboardLayout from 'src/components/shared/layouts/dashboard/DashboardLayout';
import DashboardTemplate from 'src/components/shared/layouts/dashboard/DashboardTemplate';
import { DayBookTabsOld } from 'src/types/dayBook';
import { TabInterface } from 'src/types/shared';

Page.getLayout = (page: React.ReactElement) => (
  <DashboardLayout>{page}</DashboardLayout>
);

const TABS: TabInterface<DayBookTabsOld>[] = [
  {
    value: 'listado',
    component: <DayBookIndex key="listado" />,
  },
  {
    value: 'reporte-por-cuenta',
    component: <DayBookReportByAccount key="reporte-por-cuenta" />,
  },
];

function Page() {
  const [currentTab, setCurrentTab] = useState<DayBookTabsOld>('listado');

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
