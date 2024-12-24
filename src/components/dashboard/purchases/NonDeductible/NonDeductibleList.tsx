import { Button, CardContent } from '@mui/material';
import { DataGrid, GridActionsCellItem, GridColDef } from '@mui/x-data-grid';
import ConfirmDialog from '@src/components/shared/confirm-dialog/ConfirmDialog';
import Iconify from '@src/components/shared/iconify';
import { useCollectionSnapshot } from '@src/hooks/useCollectionSnapshot';
import { COLLECTIONS_ENUM } from '@src/lib/enums/collections';
import {
  FirestoreNonDeductible,
  nonDeductibleConverter,
} from '@src/services/firestore/purchases/nonDeductible';
import { NonDeductible } from '@src/types/purchases';
import { useSnackbar } from 'notistack';
import { FC, useState } from 'react';
import UpdateNonDeductible from './UpdateNonDeductible';

const NonDeductibleList: FC = () => {
  const { enqueueSnackbar } = useSnackbar();
  const [expenseToDelete, setExpenseToDelete] = useState<NonDeductible | null>(
    null
  );
  const [expenseToUpdate, setExpenseToUpdate] = useState<NonDeductible | null>(
    null
  );

  const nonDeductibles = useCollectionSnapshot<NonDeductible>({
    collectionName: COLLECTIONS_ENUM.NON_DEDUCTIBLES,
    converter: nonDeductibleConverter,
    order: { field: 'issueDate', direction: 'desc' },
  });

  const columns: GridColDef<NonDeductible>[] = [
    {
      field: 'issueDate',
      headerName: 'Fecha de Emisión',
      type: 'date',
      width: 130,
      sortable: false,
    },
    {
      field: 'issuerName',
      flex: 1,
      headerName: 'Emisor y/o motivo',
      sortable: false,
    },
    {
      field: 'description',
      flex: 3,
      headerName: 'Descripción',
      sortable: false,
    },
    {
      field: 'total',
      headerName: 'Total',
      type: 'number',
      sortable: false,
      valueFormatter: ({ value }) =>
        value ? `$${Number(value).toFixed(2)}` : '-',
    },
    {
      field: 'paid',
      headerName: 'Pagar',
      type: 'actions',
      getActions: (params) => [
        // TODO: Add pay action button
        // params.row.paid ? (
        //   <Label variant="soft" color="success">
        //     Pagado
        //   </Label>
        // ) : (
        //   <Button variant="soft" color="warning">
        //     Pagar
        //   </Button>
        // ),
      ],
    },
    {
      field: 'actions',
      type: 'actions',
      width: 50,
      getActions: (params) => [
        <GridActionsCellItem
          label="Modificar"
          onClick={() => setExpenseToUpdate(params.row)}
          icon={<Iconify icon="pajamas:doc-changes" />}
          showInMenu
        />,
        <GridActionsCellItem
          label="Borrar"
          onClick={() => setExpenseToDelete(params.row)}
          icon={<Iconify icon="pajamas:remove" />}
          showInMenu
        />,
      ],
    },
  ];

  const handleDeleteExpense = async () => {
    if (!expenseToDelete?.id) return;

    FirestoreNonDeductible.remove(expenseToDelete.id)
      .then(() => {
        enqueueSnackbar('Gasto eliminado exitosamente');
      })
      .catch(() => {
        enqueueSnackbar('Error al eliminar el gasto', { variant: 'error' });
      })
      .finally(() => {
        setExpenseToDelete(null);
      });
  };

  return (
    <>
      <CardContent>
        <DataGrid
          autoHeight
          columns={columns}
          rows={nonDeductibles}
          disableColumnFilter
          disableRowSelectionOnClick
          initialState={{ pagination: { paginationModel: { pageSize: 20 } } }}
          pageSizeOptions={[20, 50, 100]}
        />
      </CardContent>

      <UpdateNonDeductible
        open={!!expenseToUpdate}
        initialValues={expenseToUpdate}
        onClose={() => setExpenseToUpdate(null)}
        key={expenseToUpdate?.id}
      />

      <ConfirmDialog
        onClose={() => setExpenseToDelete(null)}
        open={!!expenseToDelete}
        title="Borrar gasto"
        action={
          <Button onClick={handleDeleteExpense} variant="contained">
            Borrar
          </Button>
        }
      />
    </>
  );
};

export default NonDeductibleList;
