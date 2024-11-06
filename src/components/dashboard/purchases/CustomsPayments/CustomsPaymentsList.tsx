import { CardContent } from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { useCollectionSnapshot } from '@src/hooks/useCollectionSnapshot';
import { COLLECTIONS } from '@src/lib/enums/collections';
import { customsPaymentsConverter } from '@src/services/firebase/purchases/customsPayments';
import { CustomsPayment } from '@src/types/purchases';
import { FC } from 'react';

const CustomsPaymentsList: FC = () => {
  // const { enqueueSnackbar } = useSnackbar();
  // const [expenseToDelete, setExpenseToDelete] = useState<CustomsPayment | null>(
  //   null
  // );
  // const [expenseToUpdate, setExpenseToUpdate] = useState<CustomsPayment | null>(
  //   null
  // );

  const customsPayments = useCollectionSnapshot<CustomsPayment>({
    collectionName: COLLECTIONS.CUSTOMS_PAYMENTS,
    converter: customsPaymentsConverter,
    order: { field: 'issueDate', direction: 'desc' },
  });

  const columns: GridColDef<CustomsPayment>[] = [
    {
      field: 'issueDate',
      headerName: 'Fecha de Emisión',
      type: 'date',
      flex: 1,
      sortable: false,
    },
    {
      field: 'customsPaymentNumber',
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
    // {
    //   field: 'actions',
    //   type: 'actions',
    //   width: 50,
    //   getActions: (params) => [
    //     <GridActionsCellItem
    //       label="Modificar"
    //       onClick={() => setExpenseToUpdate(params.row)}
    //       icon={<Iconify icon="pajamas:doc-changes" />}
    //       showInMenu
    //     />,
    //     <GridActionsCellItem
    //       label="Borrar"
    //       onClick={() => setExpenseToDelete(params.row)}
    //       icon={<Iconify icon="pajamas:remove" />}
    //       showInMenu
    //     />,
    //   ],
    // },
  ];

  // const handleDeleteExpense = async () => {
  //   if (!expenseToDelete) return;

  //   deleteCustomsPayment(expenseToDelete)
  //     .then(() => {
  //       enqueueSnackbar('Factura eliminada exitosamente');
  //     })
  //     .catch(() => {
  //       enqueueSnackbar('Error al eliminar la factura', { variant: 'error' });
  //     })
  //     .finally(() => {
  //       setExpenseToDelete(null);
  //     });
  // };

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
            pagination: { paginationModel: { pageSize: 20 } },
          }}
          pageSizeOptions={[20, 50, 100]}
        />
      </CardContent>

      {/* <UpdateCustomsPayment
        open={!!expenseToUpdate}
        onClose={() => setExpenseToUpdate(null)}
        initialValues={expenseToUpdate}
        key={expenseToUpdate?.id}
      /> */}

      {/* <ConfirmDialog
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
      /> */}
    </>
  );
};

export default CustomsPaymentsList;
