import ImportCalculator from 'src/components/importCalculator/ImportCalculator';
import CalculatorControllers from 'src/components/importCalculator/ImportCalculator/CalculatorControllers';
import { ImportCalculatorProvider } from 'src/components/importCalculator/ImportCalculator/ImportCalculatorProvider';
import DashboardLayout from 'src/components/layouts/dashboard/DashboardLayout';
import DashboardTemplate from 'src/components/layouts/dashboard/DashboardTemplate';

Page.getLayout = (page: React.ReactElement) => <DashboardLayout>{page}</DashboardLayout>;

export default function Page() {
  return (
    <ImportCalculatorProvider>
      <DashboardTemplate
        documentTitle="Calcular Importación"
        heading="Calculadora de Importaciones"
        action={<CalculatorControllers />}
      >
        <ImportCalculator />
      </DashboardTemplate>
    </ImportCalculatorProvider>
  );
}
