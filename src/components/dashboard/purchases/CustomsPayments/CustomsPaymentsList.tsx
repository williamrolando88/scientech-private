import { LoadingButton } from '@mui/lab';
import { CardContent } from '@mui/material';
import { DataGrid, GridActionsCellItem, GridColDef } from '@mui/x-data-grid';
import ConfirmDialog from '@src/components/shared/confirm-dialog/ConfirmDialog';
import Iconify from '@src/components/shared/iconify';
import {
  useDeleteExpenseByType,
  useListExpensesByType,
} from '@src/hooks/cache/expenses';
import { CustomsPaymentOld } from '@src/types/expenses';
import { useSnackbar } from 'notistack';
import { FC, useState } from 'react';
import UpdateCustomsPayment from './UpdateCustomsPayment';

const CustomsPaymentsList: FC = () => {
  const { enqueueSnackbar } = useSnackbar();
  const [expenseToDelete, setExpenseToDelete] =
    useState<CustomsPaymentOld | null>(null);
  const [expenseToUpdate, setExpenseToUpdate] =
    useState<CustomsPaymentOld | null>(null);
  const { mutateAsync: deleteCustomsPayment, isPending } =
    useDeleteExpenseByType('customs_payment');
  const { data: customsPayments, isLoading } =
    useListExpensesByType<CustomsPaymentOld>('customs_payment');

  const columns: GridColDef<CustomsPaymentOld>[] = [
    {
      field: 'issue_date',
      headerName: 'Fecha de Emisión',
      type: 'date',
      flex: 1,
      sortable: false,
    },
    {
      field: 'customs_payment_number',
      headerName: 'Nro. Liquidación',
      type: 'number',
      flex: 1,
      sortable: false,
    },
    {
      field: 'description',
      flex: 6,
      headerName: 'Descripción',
      sortable: false,
    },
    {
      field: 'IVA',
      headerName: 'IVA',
      type: 'number',
      flex: 1,
      sortable: false,
      valueFormatter: ({ value }) =>
        value ? `$${Number(value).toFixed(2)}` : '-',
    },
    {
      field: 'total',
      headerName: 'Total',
      type: 'number',
      flex: 1,
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

    deleteCustomsPayment(expenseToDelete)
      .then(() => {
        enqueueSnackbar('Factura eliminada exitosamente');
      })
      .catch(() => {
        enqueueSnackbar('Error al eliminar la factura', { variant: 'error' });
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
          rows={customsPayments}
          disableColumnFilter
          disableRowSelectionOnClick
          initialState={{
            sorting: {
              sortModel: [{ field: 'issue_date', sort: 'desc' }],
            },
          }}
          loading={isLoading}
        />
      </CardContent>

      <UpdateCustomsPayment
        open={!!expenseToUpdate}
        onClose={() => setExpenseToUpdate(null)}
        initialValues={expenseToUpdate}
        key={expenseToUpdate?.id}
      />

      <ConfirmDialog
        onClose={() => setExpenseToDelete(null)}
        open={!!expenseToDelete}
        title="Borrar factura"
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

export default CustomsPaymentsList;
