import { Card, CardContent, CardHeader } from '@mui/material';
import { DataGrid, GridActionsCellItem, GridColDef } from '@mui/x-data-grid';
import { FC, useMemo, useState } from 'react';
import Iconify from 'src/components/shared/iconify';
import { useListAccountCategories } from 'src/hooks/cache/accountCategories';
import { AccountCategory } from 'src/types/accountCategories';
import { DeleteAccountCategory } from './DeleteAccountCategory';
import UpdateAccountCategory from './UpdateAccountCategory';

const ListAccountCategories: FC = () => {
  const { data: categories, isLoading } = useListAccountCategories();
  const [accountToEdit, setAccountToEdit] = useState<AccountCategory | null>(
    null
  );
  const [accountIdToDelete, setAccountIdToDelete] = useState<string | null>(
    null
  );

  const columns: GridColDef<AccountCategory>[] = useMemo(
    () => [
      {
        field: 'id',
        type: 'string',
        headerName: 'Número',
        flex: 1,
      },
      {
        field: 'name',
        headerName: 'Nombre',
        flex: 2,
      },
      {
        field: 'description',
        headerName: 'Descripción',
        flex: 5,
      },
      {
        field: 'actions',
        type: 'actions',
        width: 50,
        getActions: (params) => [
          <GridActionsCellItem
            label="Modificar"
            onClick={() => setAccountToEdit(params.row as AccountCategory)}
            icon={<Iconify icon="pajamas:doc-changes" />}
            disabled={!params.row.editable}
            showInMenu
          />,
          <GridActionsCellItem
            label="Borrar"
            onClick={() => setAccountIdToDelete(params.id as string)}
            icon={<Iconify icon="pajamas:remove" />}
            showInMenu
          />,
        ],
      },
    ],
    [setAccountIdToDelete, setAccountToEdit]
  );

  const categoriesList = useMemo(
    () => Object.values(categories || {}),
    [categories]
  );

  return (
    <Card>
      <CardHeader title="Listado de Cuentas Contables" />

      <CardContent>
        <DataGrid
          columns={columns}
          rows={categoriesList}
          loading={isLoading}
          initialState={{
            sorting: {
              sortModel: [{ field: 'id', sort: 'asc' }],
            },
          }}
          autoHeight
          disableRowSelectionOnClick
          density="compact"
        />
      </CardContent>

      <UpdateAccountCategory
        accountCategory={accountToEdit}
        onClose={() => setAccountToEdit(null)}
      />

      <DeleteAccountCategory
        accountIdToDelete={accountIdToDelete}
        setAccountIdToDelete={setAccountIdToDelete}
      />
    </Card>
  );
};

export default ListAccountCategories;
