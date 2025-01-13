import { Card } from '@mui/material';
import { DataGrid, GridColDef, GridEventListener } from '@mui/x-data-grid';
import Label from '@src/components/shared/label';
import { useListProjects } from '@src/hooks/cache/projects';
import { PROJECT_STATE } from '@src/lib/enums/projects';
import { PATH_DASHBOARD } from '@src/routes/paths';
import { Project } from '@src/types/projects';
import { useRouter } from 'next/router';
import { FC, useMemo } from 'react';

const ProjectIndex: FC = () => {
  const { push } = useRouter();
  const { data: projects, isLoading: isLoadingProjects } = useListProjects();

  const columns: GridColDef<Project>[] = useMemo(
    () => [
      {
        field: 'number',
        headerName: 'No.',
        type: 'number',
        headerAlign: 'left',
        width: 100,
      },
      {
        field: 'client',
        headerName: 'Cliente',
        flex: 1,
        valueGetter: (params) =>
          params.row.client?.name ?? params.row.client_id,
      },
      {
        field: 'description',
        headerName: 'Descripción',
        flex: 3,
      },
      {
        field: 'status',
        headerName: 'Estatus',
        headerAlign: 'center',
        align: 'center',
        valueGetter: ({ row }) => row.status === PROJECT_STATE.ACTIVE,
        renderCell: ({ value }) => (
          <Label variant="soft" color={value ? 'info' : 'success'}>
            {value ? 'Activo' : 'Completado'}
          </Label>
        ),
      },
    ],
    []
  );

  const handleRowClick: GridEventListener<'rowClick'> = (params) => {
    push(PATH_DASHBOARD.projects.open(params.id.toString()));
  };

  return (
    <Card>
      <DataGrid
        columns={columns}
        rows={projects}
        loading={isLoadingProjects}
        initialState={{
          sorting: {
            sortModel: [{ field: 'number', sort: 'desc' }],
          },
        }}
        onRowClick={handleRowClick}
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
