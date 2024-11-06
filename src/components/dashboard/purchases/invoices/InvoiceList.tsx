import { LoadingButton } from '@mui/lab';
import { CardContent } from '@mui/material';
import { DataGrid, GridActionsCellItem, GridColDef } from '@mui/x-data-grid';
import ConfirmDialog from '@src/components/shared/confirm-dialog/ConfirmDialog';
import Iconify from '@src/components/shared/iconify';
import Label from '@src/components/shared/label';
import {
  useDeleteExpenseByType,
  useListExpensesByType,
} from '@src/hooks/cache/expenses';
import { COLLECTIONS } from '@src/lib/enums/collections';
import { DB } from '@src/settings/firebase';
import { InvoiceOld } from '@src/types/expenses';
import { collection, limit, onSnapshot, query } from 'firebase/firestore';
import { useSnackbar } from 'notistack';
import { FC, useState } from 'react';
import { useEffectOnce } from 'usehooks-ts';
import UpdateInvoice from '../../vouchers/ReceivedInvoices/Invoices/UpdateInvoice';

const InvoiceList: FC = () => {
  const { enqueueSnackbar } = useSnackbar();
  const [invoiceToDelete, setInvoiceToDelete] = useState<InvoiceOld | null>(
    null
  );
  const [invoiceToUpdate, setInvoiceToUpdate] = useState<InvoiceOld | null>(
    null
  );
  const { mutateAsync: deleteInvoice, isPending } =
    useDeleteExpenseByType('invoice');
  const { data: invoices, isLoading } =
    useListExpensesByType<InvoiceOld>('invoice');

  useEffectOnce(() => {
    const invoicesCollection = collection(DB, COLLECTIONS.INVOICES);
    const q = query(invoicesCollection, limit(20));
    const unsub = onSnapshot(q, (snapshot) => {
      // do something
      const data = snapshot.docs.map((doc) => doc.data());

      console.log(data);
    });

    return unsub;
  });

  const columns: GridColDef<InvoiceOld>[] = [
    {
      field: 'issue_date',
      headerName: 'Fecha de Emisión',
      type: 'date',
      width: 130,
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
        <Label
          variant="soft"
          color={params.row.paid ? 'success' : 'error'}
          sx={{ p: 0 }}
        >
          {params.row.paid ? 'Pagado' : 'Pendiente'}
        </Label>,
      ],
    },
    {
      field: 'actions',
      type: 'actions',
      width: 50,
      getActions: (params) => [
        <GridActionsCellItem
          label="Modificar"
          onClick={() => setInvoiceToUpdate(params.row)}
          icon={<Iconify icon="pajamas:doc-changes" />}
          showInMenu
        />,
        <GridActionsCellItem
          label="Borrar"
          onClick={() => setInvoiceToDelete(params.row)}
          icon={<Iconify icon="pajamas:remove" />}
          showInMenu
        />,
      ],
    },
  ];

  const handleDeleteExpense = async () => {
    if (!invoiceToDelete) return;

    deleteInvoice(invoiceToDelete)
      .then(() => {
        enqueueSnackbar('Factura eliminada exitosamente');
      })
      .catch(() => {
        enqueueSnackbar('Error al eliminar la factura', { variant: 'error' });
      })
      .finally(() => {
        setInvoiceToDelete(null);
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
          pageSizeOptions={[20, 50, 100]}
          initialState={{
            pagination: { paginationModel: { pageSize: 20 } },
            sorting: {
              sortModel: [{ field: 'issue_date', sort: 'desc' }],
            },
          }}
          loading={isLoading}
        />
      </CardContent>

      <UpdateInvoice
        open={!!invoiceToUpdate}
        initialValues={invoiceToUpdate}
        onClose={() => setInvoiceToUpdate(null)}
        key={invoiceToUpdate?.id}
      />

      <ConfirmDialog
        onClose={() => setInvoiceToDelete(null)}
        open={!!invoiceToDelete}
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
