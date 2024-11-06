import { Button, CardContent } from '@mui/material';
import { DataGrid, GridActionsCellItem, GridColDef } from '@mui/x-data-grid';
import ConfirmDialog from '@src/components/shared/confirm-dialog';
import Iconify from '@src/components/shared/iconify';
import { useCollectionSnapshot } from '@src/hooks/useCollectionSnapshot';
import { COLLECTIONS } from '@src/lib/enums/collections';
import {
  FirestoreReceivedInvoice,
  receivedInvoiceConverter,
} from '@src/services/firebase/purchases/invoice';
import { ReceivedInvoice } from '@src/types/purchases';
import { useSnackbar } from 'notistack';
import { FC, useState } from 'react';
import UpdateInvoice from './UpdateInvoice';

const InvoiceList: FC = () => {
  const { enqueueSnackbar } = useSnackbar();
  const [invoiceToDelete, setInvoiceToDelete] =
    useState<ReceivedInvoice | null>(null);
  const [invoiceToUpdate, setInvoiceToUpdate] =
    useState<ReceivedInvoice | null>(null);

  const invoices = useCollectionSnapshot<ReceivedInvoice>({
    collectionName: COLLECTIONS.INVOICES,
    converter: receivedInvoiceConverter,
    order: { field: 'issueDate', direction: 'desc' },
  });

  const columns: GridColDef<ReceivedInvoice>[] = [
    {
      field: 'issueDate',
      headerName: 'Fecha de Emisión',
      type: 'date',
      width: 130,
      sortable: false,
    },
    {
      field: 'issuerId',
      headerName: 'RUC',
      width: 180,
      sortable: false,
    },
    {
      field: 'issuerName',
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

  const handleDeleteExpense = () => {
    if (!invoiceToDelete?.id) return;

    FirestoreReceivedInvoice.remove(invoiceToDelete.id)
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
          getRowId={(row) => row.id!}
          disableColumnFilter
          disableRowSelectionOnClick
          initialState={{ pagination: { paginationModel: { pageSize: 20 } } }}
          pageSizeOptions={[20, 50, 100]}
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
          <Button onClick={handleDeleteExpense} variant="contained">
            Borrar
          </Button>
        }
      />
    </>
  );
};

export default InvoiceList;
