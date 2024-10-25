import { LoadingButton } from '@mui/lab';
import { CardContent } from '@mui/material';
import { DataGrid, GridActionsCellItem, GridColDef } from '@mui/x-data-grid';
import ConfirmDialog from '@src/components/shared/confirm-dialog/ConfirmDialog';
import Iconify from '@src/components/shared/iconify';
import {
  useDeleteExpenseByType,
  useListExpensesByType,
} from '@src/hooks/cache/expenses';
import { Invoice } from '@src/types/expenses';
import { useSnackbar } from 'notistack';
import { FC, useState } from 'react';
import UpdateInvoice from '../../vouchers/ReceivedInvoices/Invoices/UpdateInvoice';

const InvoiceList: FC = () => {
  const { enqueueSnackbar } = useSnackbar();
  const [expenseToDelete, setExpenseToDelete] = useState<Invoice | null>(null);
  const [expenseToUpdate, setExpenseToUpdate] = useState<Invoice | null>(null);
  const { mutateAsync: deleteInvoice, isPending } =
    useDeleteExpenseByType('invoice');
  const { data: invoices, isLoading } =
    useListExpensesByType<Invoice>('invoice');

  const columns: GridColDef<Invoice>[] = [
    {
      field: 'issue_date',
      headerName: 'Fecha de Emisión',
      type: 'date',
      width: 130,
      sortable: false,
    },
    {
      field: 'establishment',
      headerName: 'Suc.',
      type: 'number',
      width: 50,
      sortable: false,
    },
    {
      field: 'emission_point',
      headerName: 'Pto.',
      type: 'number',
      width: 50,
      sortable: false,
    },
    {
      field: 'sequential_number',
      headerName: 'Nro.',
      type: 'number',
      width: 100,
      sortable: false,
    },
    {
      field: 'issuer_id',
      headerName: 'RUC',
      width: 180,
      sortable: false,
    },
    {
      field: 'issuer_name',
      flex: 1,
      headerName: 'Razón Social',
      sortable: false,
    },
    {
      field: 'tax_exempted_subtotal',
      headerName: 'Base 0%',
      type: 'number',
      sortable: false,
      valueFormatter: ({ value }) =>
        value ? `$${Number(value).toFixed(2)}` : '-',
    },
    {
      field: 'taxed_subtotal',
      headerName: 'Base imp.',
      type: 'number',
      sortable: false,
      valueFormatter: ({ value }) =>
        value ? `$${Number(value).toFixed(2)}` : '-',
    },
    {
      field: 'IVA',
      headerName: 'IVA',
      type: 'number',
      sortable: false,
      valueFormatter: ({ value }) =>
        value ? `$${Number(value).toFixed(2)}` : '-',
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

    deleteInvoice(expenseToDelete)
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
          rows={invoices}
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

      <UpdateInvoice
        open={!!expenseToUpdate}
        initialValues={expenseToUpdate}
        onClose={() => setExpenseToUpdate(null)}
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

export default InvoiceList;
