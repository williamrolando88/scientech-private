import { Card } from '@mui/material';
import { DataGrid, GridActionsCellItem, GridColDef } from '@mui/x-data-grid';
import { useListClients } from '@src/hooks/cache/clients';
import { Client } from '@src/types/clients';
import { FC, useState } from 'react';
import UpdateClient from '@src/components/dashboard/clients/UpdateClient';
import Iconify from '@src/components/shared/iconify';

const ClientIndex: FC = () => {
  const { data: clients, isLoading } = useListClients();
  const [clientToUpdate, setClientToUpdate] = useState<Client | null>(null);

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
    {
      field: 'actions',
      type: 'actions',
      width: 50,
      getActions: (params) => [
        <GridActionsCellItem
          label="Modificar"
          onClick={() => setClientToUpdate(params.row)}
          icon={<Iconify icon="pajamas:doc-changes" />}
          showInMenu
        />,
      ],
    },
  ];

  return (
    <>
      <Card>
        <DataGrid
          columns={columns}
          rows={clients}
          loading={isLoading}
          initialState={{
            sorting: {
              sortModel: [{ field: 'name', sort: 'desc' }],
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

      <UpdateClient
        initialValues={clientToUpdate}
        open={!!clientToUpdate}
        onClose={() => setClientToUpdate(null)}
      />
    </>
  );
};

export default ClientIndex;
