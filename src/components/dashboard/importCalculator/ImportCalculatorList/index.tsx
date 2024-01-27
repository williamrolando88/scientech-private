import { Card } from '@mui/material';
import { DataGrid, GridActionsCellItem, GridColDef } from '@mui/x-data-grid';
import { useRouter } from 'next/router';
import { useMemo, useState } from 'react';
import Iconify from 'src/components/shared/iconify';
import useQueryOnMount from 'src/hooks/useQueryOnMount';
import { PATH_DASHBOARD } from 'src/routes/paths';
import ImportCalculationsFirebase from 'src/services/firebase/importCalculations';
import { ImportCalculator } from 'src/types/importCalculator';
import { SearchToolbar } from './SearchToolbar';

const ImportCalculatorList = () => {
  const [searchText, setSearchText] = useState('');
  const { push } = useRouter();

  const [calculations, loading] = useQueryOnMount<ImportCalculator[]>(
    ImportCalculationsFirebase.list,
    []
  );

  const columns: GridColDef<ImportCalculator>[] = useMemo(
    () => [
      {
        field: 'description',
        headerName: 'Descripción',
        flex: 1,
        resizable: false,
        minWidth: 200,
        valueGetter: (params) =>
          params.row.metadata.description || 'Sin descripción',
      },
      {
        field: 'created_at',
        headerName: 'Creado',
        description: 'Fecha de creación',
        resizable: false,
        type: 'date',
        width: 180,
        valueGetter: (params) => new Date(params.row.metadata.createdAt || ''),
      },
      {
        field: 'updated_at',
        headerName: 'Modificado',
        description: 'Fecha de la última modificación',
        resizable: false,
        type: 'date',
        width: 180,
        valueGetter: (params) => new Date(params.row.metadata.updatedAt || ''),
      },
      {
        field: 'actions',
        type: 'actions',
        width: 50,
        getActions: (params) => [
          <GridActionsCellItem
            label="Abrir"
            onClick={() =>
              push(PATH_DASHBOARD.calculator.view(params.id.toString()))
            }
            icon={<Iconify icon="pajamas:doc-text" />}
            showInMenu
          />,
          <GridActionsCellItem
            label="Borrar"
            onClick={() => alert(`Delete ${params.id}`)}
            icon={<Iconify icon="pajamas:remove" />}
            showInMenu
          />,
        ],
      },
    ],
    [push]
  );

  const filteredCalculations = useMemo(
    () =>
      searchText
        ? calculations?.filter((calculation) =>
            calculation.metadata.description
              .toLowerCase()
              .includes(searchText.toLowerCase())
          )
        : calculations,
    [calculations, searchText]
  );

  return (
    <Card>
      <DataGrid
        columns={columns}
        rows={filteredCalculations}
        onRowClick={(params) =>
          push(PATH_DASHBOARD.calculator.view(params.id.toString()))
        }
        loading={loading}
        initialState={{
          sorting: {
            sortModel: [{ field: 'updated_at', sort: 'desc' }],
          },
        }}
        slots={{ toolbar: SearchToolbar }}
        slotProps={{
          toolbar: { value: searchText, handleChange: setSearchText },
        }}
        autoHeight
        disableRowSelectionOnClick
      />
    </Card>
  );
};

export default ImportCalculatorList;
