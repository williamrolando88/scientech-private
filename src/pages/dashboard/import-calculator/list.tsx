import { Button } from '@mui/material';
import Link from 'next/link';
import ImportCalculatorList from 'src/components/dashboard/importCalculator/ImportCalculatorList';
import DashboardLayout from 'src/components/layouts/dashboard/DashboardLayout';
import DashboardTemplate from 'src/components/layouts/dashboard/DashboardTemplate';
import { IMPORT_CALCULATOR_LINKS } from 'src/lib/constants/importCalculator';
import { PATH_DASHBOARD } from 'src/routes/paths';

Page.getLayout = (page: React.ReactElement) => (
  <DashboardLayout>{page}</DashboardLayout>
);

export default function Page() {
  return (
    <DashboardTemplate
      documentTitle="Calcular Importación"
      heading="Calculadora de Importaciones"
      action={
        <Link href={PATH_DASHBOARD.calculator.new}>
          <Button variant="contained">Nuevo</Button>
        </Link>
      }
      links={IMPORT_CALCULATOR_LINKS('Listado')}
    >
      <ImportCalculatorList />
    </DashboardTemplate>
  );
}
