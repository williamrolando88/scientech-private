import React from 'react';
import AddDayBookTransaction from 'src/components/dashboard/daybook/AddDayBookTransaction';
import DayBookIndex from 'src/components/dashboard/daybook/DayBookIndex';
import DashboardLayout from 'src/components/layouts/dashboard/DashboardLayout';
import DashboardTemplate from 'src/components/layouts/dashboard/DashboardTemplate';

Page.getLayout = (page: React.ReactElement) => (
  <DashboardLayout>{page}</DashboardLayout>
);

function Page() {
  return (
    <DashboardTemplate
      documentTitle="Libro Diario"
      heading="Libro Diario"
      action={<AddDayBookTransaction />}
    >
      <DayBookIndex />
    </DashboardTemplate>
  );
}

export default Page;
