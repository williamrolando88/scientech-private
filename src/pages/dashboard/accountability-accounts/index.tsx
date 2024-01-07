import { Button } from '@mui/material';
import React from 'react';
import DashboardLayout from 'src/components/layouts/dashboard/DashboardLayout';
import DashboardTemplate from 'src/components/layouts/dashboard/DashboardTemplate';

Page.getLayout = (page: React.ReactElement) => <DashboardLayout>{page}</DashboardLayout>;

function Page() {
  return (
    <DashboardTemplate
      documentTitle="Cuentas Contables"
      heading="Cuentas Contables"
      action={<Button variant="contained">Agregar</Button>}
    >
      Mostrar el arbol de cuentas contables
    </DashboardTemplate>
  );
}

export default Page;
