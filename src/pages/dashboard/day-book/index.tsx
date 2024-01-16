import { Button } from '@mui/material';
import React from 'react';
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
      action={<Button variant="contained">Nuevo</Button>}
    >
      Aqui viene la tabla de asientos contables
    </DashboardTemplate>
  );
}

export default Page;
