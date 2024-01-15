import { Button, Card, CardContent, CardHeader } from '@mui/material';
import { DataGrid, GridActionsCellItem, GridColumns } from '@mui/x-data-grid';
import { useSnackbar } from 'notistack';
import { FC, useCallback, useMemo, useState } from 'react';
import ConfirmDialog from 'src/components/shared/confirm-dialog';
import Iconify from 'src/components/shared/iconify';
import { useAccountCategoriesStore } from 'src/lib/stores/accountCategories';
import { AccountCategories } from 'src/services/firebase/applicationSettings';
import { AccountCategory } from 'src/types/accountCategories';
import { useEffectOnce } from 'usehooks-ts';
import UpdateAccountCategory from './UpdateAccountCategory';

const ListAccountCategories: FC = () => {
  const { enqueueSnackbar } = useSnackbar();
  const { categories, setCategories } = useAccountCategoriesStore();
  const [loading, setLoading] = useState(false);
  const [accountToEdit, setAccountToEdit] = useState<AccountCategory | null>(
    null
  );
  const [accountIdToDelete, setAccountIdToDelete] = useState<string | null>(
    null
  );

  const fetchAccountCategories = async () => {
    setLoading(true);
    const accountCategories = await AccountCategories.list();

    setCategories(accountCategories);
    setLoading(false);
  };

  useEffectOnce(() => {
    fetchAccountCategories();
  });

  const handleDeleteAccount = useCallback(async () => {
    if (!accountIdToDelete) return;

    delete categories[accountIdToDelete];

    try {
      await AccountCategories.upsert(categories);

      setCategories(categories);
      setAccountIdToDelete(null);
    } catch (error) {
      console.error(error);
      enqueueSnackbar('Ocurrió un error al eliminar la cuenta', {
        variant: 'error',
      });
    }
  }, [accountIdToDelete, categories, enqueueSnackbar, setCategories]);

  const columns: GridColumns<AccountCategory> = useMemo(
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

  const categoriesList = Object.values(categories);

  return (
    <Card>
      <CardHeader title="Listado de Cuentas Contables" />

      <CardContent>
        <DataGrid
          columns={columns}
          rows={categoriesList}
          loading={loading}
          initialState={{
            sorting: {
              sortModel: [{ field: 'id', sort: 'asc' }],
            },
          }}
          autoHeight
          disableSelectionOnClick
          density="compact"
        />
      </CardContent>

      <UpdateAccountCategory
        accountCategory={accountToEdit}
        onClose={() => setAccountToEdit(null)}
      />

      <ConfirmDialog
        open={Boolean(accountIdToDelete)}
        title="Eliminar Cuenta Contable"
        content="¿Está seguro que desea eliminar esta cuenta contable?"
        action={
          <Button variant="contained" onClick={handleDeleteAccount}>
            Eliminar
          </Button>
        }
        onClose={() => setAccountIdToDelete(null)}
      />
    </Card>
  );
};

export default ListAccountCategories;
