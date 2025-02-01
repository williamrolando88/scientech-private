import { Card } from '@mui/material';
import { DataGrid, GridColDef, GridEventListener } from '@mui/x-data-grid';
import Label from '@src/components/shared/label';
import { useListProjects } from '@src/hooks/cache/projects';
import { PROJECT_STATE } from '@src/lib/enums/projects';
import { PATH_DASHBOARD } from '@src/routes/paths';
import { Project } from '@src/types/projects';
import { useRouter } from 'next/router';
import { FC, useMemo, useState } from 'react';
import MigrateProject from './MigrateProject';

const ProjectIndex: FC = () => {
  const { push } = useRouter();
  const [project2Migrate, setProject2Migrate] = useState<Project | null>(null);
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
        valueGetter: ({ row }) =>
          row.description
            ?.split('\\n')
            .map((s) => s.trim())
            .join(' '),
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
    if (params.row.number) {
      push(PATH_DASHBOARD.projects.open(params.id.toString()));
    } else {
      setProject2Migrate(params.row);
    }
  };

  return (
    <>
      <Card>
        <DataGrid
          columns={columns}
          rows={projects}
          loading={isLoadingProjects}
          initialState={{
            sorting: {
              sortModel: [{ field: 'number', sort: 'desc' }],
            },
            pagination: { paginationModel: { pageSize: 25 } },
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

      <MigrateProject
        onClose={() => setProject2Migrate(null)}
        open={Boolean(project2Migrate)}
        project={project2Migrate}
      />
    </>
  );
};

export default ProjectIndex;
