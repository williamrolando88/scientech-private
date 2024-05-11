import { LoadingButton } from '@mui/lab';
import { CardContent } from '@mui/material';
import { DataGrid, GridActionsCellItem, GridColDef } from '@mui/x-data-grid';
import ConfirmDialog from '@src/components/shared/confirm-dialog/ConfirmDialog';
import Iconify from '@src/components/shared/iconify';
import {
  useDeleteExpenseByType,
  useListExpensesByType,
} from '@src/hooks/cache/expenses';
import { Expense } from '@src/types/expenses';
import { useSnackbar } from 'notistack';
import { FC, useState } from 'react';
import UpdateSaleNote from './UpdateSaleNote';

const SaleNoteList: FC = () => {
  const { enqueueSnackbar } = useSnackbar();
  const [expenseToDelete, setExpenseToDelete] = useState<Expense | null>(null);
  const [expenseToUpdate, setExpenseToUpdate] = useState<Expense | null>(null);
  const { mutateAsync: deleteExpense, isPending } =
    useDeleteExpenseByType('sale_note');
  const { data: saleNote, isLoading } =
    useListExpensesByType<Expense>('sale_note');

  const columns: GridColDef<Expense>[] = [
    {
      field: 'issue_date',
      headerName: 'Fecha de Emisión',
      type: 'date',
      width: 130,
      sortable: false,
    },
    {
      field: 'issuer_name',
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
    if (!expenseToDelete) return;

    deleteExpense(expenseToDelete)
      .then(() => {
        enqueueSnackbar('Nota de venta eliminada exitosamente');
      })
      .catch(() => {
        enqueueSnackbar('Error al eliminar la nota de venta', {
          variant: 'error',
        });
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
          rows={saleNote}
          disableColumnFilter
          initialState={{
            sorting: {
              sortModel: [{ field: 'issue_date', sort: 'desc' }],
            },
          }}
          loading={isLoading}
        />
      </CardContent>

      <UpdateSaleNote
        open={!!expenseToUpdate}
        initialValues={expenseToUpdate}
        onClose={() => setExpenseToUpdate(null)}
        key={expenseToUpdate?.id}
      />

      <ConfirmDialog
        onClose={() => setExpenseToDelete(null)}
        open={!!expenseToDelete}
        title="Borrar nota de venta"
        action={
          <LoadingButton
            onClick={handleDeleteExpense}
            loading={isPending}
            variant="contained"
          >
            Borrar
          </LoadingButton>
        }
      />
    </>
  );
};

export default SaleNoteList;
