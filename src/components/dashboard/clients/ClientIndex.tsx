import { Card } from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { useListClients } from '@src/hooks/cache/clients';
import { Client } from '@src/types/clients';
import { FC } from 'react';

// Todo: Add client update and delete actions

const columns: GridColDef<Client>[] = [
  {
    field: 'name',
    headerName: 'Nombre',
    flex: 1,
    resizable: false,
    minWidth: 200,
  },
  {
    field: 'id',
    headerName: 'CI/RUC',
    flex: 1,
    resizable: false,
    minWidth: 200,
  },
  {
    field: 'address',
    headerName: 'Dirección',
    flex: 3,
    resizable: false,
    minWidth: 200,
  },
];

const ClientIndex: FC = () => {
  const { data: clients, isLoading } = useListClients();

  return (
    <Card>
      <DataGrid
        columns={columns}
        rows={clients}
        loading={isLoading}
        initialState={{
          sorting: {
            sortModel: [{ field: 'updated_at', sort: 'desc' }],
          },
        }}
        sx={{
          '& .MuiDataGrid-columnHeader': {
            bgcolor: (theme) => theme.palette.action.selected,
          },
        }}
        autoHeight
        disableRowSelectionOnClick
        density="compact"
      />
    </Card>
  );
};

export default ClientIndex;
