import { FC } from 'react';
import DashboardTemplate from 'src/components/shared/DashboardTemplate';
import ImportCalculationsFirebase from 'src/firebase/importCalculations';
import useQueryOnMount from 'src/hooks/useQueryOnMount';

const Page: FC = () => {
  const [calculations, loading] = useQueryOnMount(ImportCalculationsFirebase.list);

  return (
    <DashboardTemplate documentTitle="Calcular Importación">
      {loading && <div>Cargando...</div>}
      <div>
        <pre>{JSON.stringify(calculations, null, 2)}</pre>
      </div>
    </DashboardTemplate>
  );
};

export default Page;
