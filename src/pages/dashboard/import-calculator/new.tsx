import ImportCalculatorComponent from 'src/components/importCalculator/ImportCalculator';
import CalculatorControllers from 'src/components/importCalculator/ImportCalculator/CalculatorControllers';
import { ImportCalculatorProvider } from 'src/components/importCalculator/ImportCalculator/ImportCalculatorProvider';
import DashboardLayout from 'src/components/layouts/dashboard/DashboardLayout';
import DashboardTemplate from 'src/components/layouts/dashboard/DashboardTemplate';
import { IMPORT_CALCULATOR_LINKS } from 'src/lib/constants/importCalculator';

Page.getLayout = (page: React.ReactElement) => <DashboardLayout>{page}</DashboardLayout>;

export default function Page() {
  return (
    <ImportCalculatorProvider>
      <DashboardTemplate
        documentTitle="Calcular Importación"
        heading="Calculadora de Importaciones"
        action={<CalculatorControllers />}
        links={IMPORT_CALCULATOR_LINKS('Nuevo')}
      >
        <ImportCalculatorComponent />
      </DashboardTemplate>
    </ImportCalculatorProvider>
  );
}
