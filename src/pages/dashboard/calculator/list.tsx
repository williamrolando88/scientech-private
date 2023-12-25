import { Button } from '@mui/material';
import { DataGrid, GridActionsCellItem, GridColumns } from '@mui/x-data-grid';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useMemo } from 'react';
import { ImportCalculator } from 'src/@types/calculator';
import DashboardLayout from 'src/components/layouts/dashboard/DashboardLayout';
import DashboardTemplate from 'src/components/layouts/dashboard/DashboardTemplate';
import Iconify from 'src/components/shared/iconify';
import useQueryOnMount from 'src/hooks/useQueryOnMount';
import { PATH_DASHBOARD } from 'src/routes/paths';
import ImportCalculationsFirebase from 'src/services/firebase/importCalculations';

Page.getLayout = (page: React.ReactElement) => <DashboardLayout>{page}</DashboardLayout>;

export default function Page() {
  const { push } = useRouter();
  const [calculations, loading] = useQueryOnMount<ImportCalculator[]>(
    ImportCalculationsFirebase.list
  );

  const columns: GridColumns<ImportCalculator> = useMemo(
    () => [
      {
        field: 'description',
        headerName: 'Descripción',
        flex: 1,
        resizable: false,
        valueGetter: (params) => params.row.metadata.description || 'Sin descripción',
      },
      {
        field: 'updated_at',
        headerName: 'Modificado',
        resizable: false,
        tipe: 'date',
        width: 200,
        valueGetter: (params) =>
          new Date(params.row.metadata.updatedAt || '').toLocaleString('es-ES'),
      },
      {
        field: 'actions',
        type: 'actions',
        width: 100,
        getActions: (params) => [
          <GridActionsCellItem
            label="Abrir"
            onClick={() => push(PATH_DASHBOARD.calculator.view(params.id.toString()))}
            icon={<Iconify icon="pajamas:doc-text" />}
          />,
          <GridActionsCellItem
            label="Borrar"
            onClick={() => alert(`Delete ${params.id}`)}
            icon={<Iconify icon="eva:trash-2-outline" />}
            showInMenu
          />,
        ],
      },
    ],
    [push]
  );

  return (
    <DashboardTemplate
      documentTitle="Calcular Importación"
      heading="Calculadora de Importaciones"
      action={
        <Link href={PATH_DASHBOARD.calculator.new}>
          <Button variant="contained">Nuevo</Button>
        </Link>
      }
    >
      <DataGrid
        columns={columns}
        rows={calculations || []}
        loading={loading}
        autoHeight
        disableSelectionOnClick
      />
    </DashboardTemplate>
  );
}
