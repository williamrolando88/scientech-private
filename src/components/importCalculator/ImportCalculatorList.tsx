import { DataGrid, GridActionsCellItem, GridColumns } from '@mui/x-data-grid';
import { useRouter } from 'next/router';
import { useMemo } from 'react';
import { ImportCalculator } from 'src/@types/importCalculator';
import Iconify from 'src/components/shared/iconify';
import useQueryOnMount from 'src/hooks/useQueryOnMount';
import { PATH_DASHBOARD } from 'src/routes/paths';
import ImportCalculationsFirebase from 'src/services/firebase/importCalculations';

const ImportCalculatorList = () => {
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
        minWidth: 200,
        valueGetter: (params) => params.row.metadata.description || 'Sin descripción',
      },
      {
        field: 'created_at',
        headerName: 'Creado',
        resizable: false,
        tipe: 'date',
        width: 180,
        valueGetter: (params) =>
          new Date(params.row.metadata.createdAt || '').toLocaleString('es-ES'),
      },
      {
        field: 'updated_at',
        headerName: 'Modificado',
        resizable: false,
        tipe: 'date',
        width: 180,
        valueGetter: (params) =>
          new Date(params.row.metadata.updatedAt || '').toLocaleString('es-ES'),
      },
      {
        field: 'actions',
        type: 'actions',
        width: 50,
        getActions: (params) => [
          <GridActionsCellItem
            label="Abrir"
            onClick={() => push(PATH_DASHBOARD.calculator.view(params.id.toString()))}
            icon={<Iconify icon="pajamas:doc-text" />}
            showInMenu
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
    <DataGrid
      columns={columns}
      rows={calculations || []}
      onRowClick={(params) => push(PATH_DASHBOARD.calculator.view(params.id.toString()))}
      loading={loading}
      autoHeight
      disableSelectionOnClick
    />
  );
};

export default ImportCalculatorList;
