import { Card } from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { useListClients } from '@src/hooks/cache/clients';
import { useListProjects } from '@src/hooks/cache/projects';
import { Project } from '@src/types/projects';
import { FC, useMemo } from 'react';

const ProjectIndex: FC = () => {
  const { data: projects, isLoading: isLoadingProjects } = useListProjects();
  const { data: clients, isLoading: isLoadingClients } = useListClients();

  const columns: GridColDef<Project>[] = useMemo(
    () => [
      {
        field: 'id',
        headerName: 'No.',
        resizable: false,
        width: 80,
      },
      {
        field: 'name',
        headerName: 'Nombre',
        flex: 1,
        resizable: false,
        minWidth: 200,
      },
      {
        field: 'client_id',
        headerName: 'Cliente',
        flex: 1,
        resizable: false,
        minWidth: 200,
        valueGetter: (params) =>
          clients?.find((client) => client.id === params.value)?.name || '',
      },
      {
        field: 'description',
        headerName: 'Descripción',
        flex: 3,
        resizable: false,
        minWidth: 200,
      },
    ],
    [clients]
  );

  return (
    <Card>
      <DataGrid
        columns={columns}
        rows={projects}
        loading={isLoadingProjects || isLoadingClients}
        initialState={{
          sorting: {
            sortModel: [{ field: 'id', sort: 'desc' }],
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

export default ProjectIndex;
