import { useRouter } from 'next/router';
import { ImportCalculator } from 'src/@types/importCalculator';
import ImportCalculatorComponent from 'src/components/importCalculator/ImportCalculator';
import CalculatorControllers from 'src/components/importCalculator/ImportCalculator/CalculatorControllers';
import { ImportCalculatorProvider } from 'src/components/importCalculator/ImportCalculator/ImportCalculatorProvider';
import DashboardLayout from 'src/components/layouts/dashboard/DashboardLayout';
import DashboardTemplate from 'src/components/layouts/dashboard/DashboardTemplate';
import useQueryOnMount from 'src/hooks/useQueryOnMount';
import { IMPORT_CALCULATOR_LINKS } from 'src/lib/constants/importCalculator';
import ImportCalculationsFirebase from 'src/services/firebase/importCalculations';

Page.getLayout = (page: React.ReactElement) => <DashboardLayout>{page}</DashboardLayout>;

export default function Page() {
  const {
    query: { id },
  } = useRouter();

  const [calculator] = useQueryOnMount<ImportCalculator>(() =>
    ImportCalculationsFirebase.open(id as string)
  );

  return (
    <ImportCalculatorProvider fetchedValues={calculator}>
      <DashboardTemplate
        documentTitle="Calcular Importación"
        heading="Calculadora de Importaciones"
        action={<CalculatorControllers />}
        links={IMPORT_CALCULATOR_LINKS('Editar')}
      >
        <ImportCalculatorComponent />
      </DashboardTemplate>
    </ImportCalculatorProvider>
  );
}
