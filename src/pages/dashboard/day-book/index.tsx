import { Card, CardContent, Tab, Tabs } from '@mui/material';
import { capitalize } from 'lodash';
import React, { useState } from 'react';
import AddDayBookTransaction from 'src/components/dashboard/daybook/AddDayBookTransaction';
import DayBookIndex from 'src/components/dashboard/daybook/DayBookIndex';
import DayBookReport from 'src/components/dashboard/daybook/DayBookReport';
import DashboardLayout from 'src/components/layouts/dashboard/DashboardLayout';
import DashboardTemplate from 'src/components/layouts/dashboard/DashboardTemplate';
import { DayBookTabs } from 'src/types/dayBook';
import { TabInterface } from 'src/types/shared';

Page.getLayout = (page: React.ReactElement) => (
  <DashboardLayout>{page}</DashboardLayout>
);

function Page() {
  const [currentTab, setCurrentTab] = useState<DayBookTabs>('listado');

  const TABS: TabInterface<DayBookTabs>[] = [
    { value: 'listado', component: <DayBookIndex /> },
    { value: 'reporte', component: <DayBookReport /> },
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
              <Tab key={value} label={capitalize(value)} value={value} />
            ))}
          </Tabs>
        </CardContent>

        {TABS.map(({ value, component }) => value === currentTab && component)}
      </Card>
    </DashboardTemplate>
  );
}

export default Page;
