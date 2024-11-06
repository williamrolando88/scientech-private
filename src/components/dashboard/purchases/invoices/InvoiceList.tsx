import { CardContent } from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import Label from '@src/components/shared/label';
import { useCollectionSnapshot } from '@src/hooks/useCollectionSnapshot';
import { COLLECTIONS } from '@src/lib/enums/collections';
import { receivedInvoiceConverter } from '@src/services/firebase/purchases/invoice';
import { ReceivedInvoice } from '@src/types/purchases';
import { FC } from 'react';

const InvoiceList: FC = () => {
  const invoices = useCollectionSnapshot<ReceivedInvoice>({
    collectionName: COLLECTIONS.INVOICES,
    converter: receivedInvoiceConverter,
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
        <Label
          variant="soft"
          color={params.row.paid ? 'success' : 'error'}
          sx={{ p: 0 }}
        >
          {params.row.paid ? 'Pagado' : 'Pendiente'}
        </Label>,
      ],
    },
    // {
    //   field: 'actions',
    //   type: 'actions',
    //   width: 50,
    //   getActions: (params) => [
    //     <GridActionsCellItem
    //       label="Modificar"
    //       onClick={() => setInvoiceToUpdate(params.row)}
    //       icon={<Iconify icon="pajamas:doc-changes" />}
    //       showInMenu
    //     />,
    //     <GridActionsCellItem
    //       label="Borrar"
    //       onClick={() => setInvoiceToDelete(params.row)}
    //       icon={<Iconify icon="pajamas:remove" />}
    //       showInMenu
    //     />,
    //   ],
    // },
  ];

  // const handleDeleteExpense = async () => {
  //   if (!invoiceToDelete) return;

  //   deleteInvoice(invoiceToDelete)
  //     .then(() => {
  //       enqueueSnackbar('Factura eliminada exitosamente');
  //     })
  //     .catch(() => {
  //       enqueueSnackbar('Error al eliminar la factura', { variant: 'error' });
  //     })
  //     .finally(() => {
  //       setInvoiceToDelete(null);
  //     });
  // };

  return (
    <>
      <CardContent>
        <DataGrid
          autoHeight
          columns={columns}
          rows={invoices}
          disableColumnFilter
          disableRowSelectionOnClick
          initialState={{ pagination: { paginationModel: { pageSize: 20 } } }}
          pageSizeOptions={[20, 50, 100]}
        />
      </CardContent>

      {/* <UpdateInvoice
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
      /> */}
    </>
  );
};

export default InvoiceList;
