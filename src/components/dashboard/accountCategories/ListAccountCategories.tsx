import { Card, CardContent, CardHeader } from '@mui/material';
import { DataGrid, GridActionsCellItem, GridColumns } from '@mui/x-data-grid';
import { useMemo, useState } from 'react';
import Iconify from 'src/components/shared/iconify';
import { useAccountCategoriesStore } from 'src/lib/stores/accountCategories';
import { AccountCategories } from 'src/services/firebase/applicationSettings';
import { AccountCategory } from 'src/types/accountCategories';
import { useEffectOnce } from 'usehooks-ts';

const ListAccountCategories = () => {
  const [loading, setLoading] = useState(false);
  const { categories, setCategories } = useAccountCategoriesStore();

  const fetchAccountCategories = async () => {
    setLoading(true);
    const accountCategories = await AccountCategories.list();

    setCategories(accountCategories);
    setLoading(false);
  };

  useEffectOnce(() => {
    fetchAccountCategories();
  });

  const columns: GridColumns<AccountCategory> = useMemo(
    () => [
      {
        field: 'id',
        type: 'text',
        headerName: 'Número',
        flex: 1,
      },
      {
        field: 'name',
        headerName: 'Nombre',
        flex: 3,
      },
      {
        field: 'actions',
        type: 'actions',
        width: 50,
        getActions: (params) => [
          <GridActionsCellItem
            label="Modificar"
            onClick={() => alert('Modificar')}
            icon={<Iconify icon="pajamas:doc-changes" />}
            showInMenu
          />,
          <GridActionsCellItem
            label="Borrar"
            onClick={() => alert(`Delete ${params.id}`)}
            icon={<Iconify icon="pajamas:doc-changes" />}
            showInMenu
          />,
        ],
      },
    ],
    []
  );

  return (
    <Card>
      <CardHeader title="Listado de Cuentas Contables" />

      <CardContent>
        <DataGrid
          columns={columns}
          rows={categories}
          loading={loading}
          initialState={{
            sorting: {
              sortModel: [{ field: 'id', sort: 'desc' }],
            },
          }}
          autoHeight
          disableSelectionOnClick
        />
      </CardContent>
    </Card>
  );
};

export default ListAccountCategories;
