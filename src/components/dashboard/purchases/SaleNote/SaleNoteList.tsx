import { CardContent } from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { useCollectionSnapshot } from '@src/hooks/useCollectionSnapshot';
import { COLLECTIONS } from '@src/lib/enums/collections';
import { saleNoteConverter } from '@src/services/firebase/purchases/saleNote';
import { SaleNote } from '@src/types/purchases';
import { FC } from 'react';

const SaleNoteList: FC = () => {
  // const { enqueueSnackbar } = useSnackbar();
  // const [expenseToDelete, setExpenseToDelete] = useState<ExpenseOld | null>(
  //   null
  // );
  // const [expenseToUpdate, setExpenseToUpdate] = useState<ExpenseOld | null>(
  //   null
  // );
  // const { mutateAsync: deleteExpense, isPending } =
  //   useDeleteExpenseByType('sale_note');
  // const { data: saleNote, isLoading } =
  //   useListExpensesByType<ExpenseOld>('sale_note');

  const saleNote = useCollectionSnapshot<SaleNote>({
    collectionName: COLLECTIONS.SALE_NOTES,
    converter: saleNoteConverter,
    order: { field: 'issueDate', direction: 'desc' },
  });

  const columns: GridColDef<SaleNote>[] = [
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

  //   deleteExpense(expenseToDelete)
  //     .then(() => {
  //       enqueueSnackbar('Nota de venta eliminada exitosamente');
  //     })
  //     .catch(() => {
  //       enqueueSnackbar('Error al eliminar la nota de venta', {
  //         variant: 'error',
  //       });
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
          rows={saleNote}
          disableColumnFilter
          disableRowSelectionOnClick
          initialState={{ pagination: { paginationModel: { pageSize: 20 } } }}
          pageSizeOptions={[20, 50, 100]}
        />
      </CardContent>

      {/* <UpdateSaleNote
        open={!!expenseToUpdate}
        initialValues={expenseToUpdate}
        onClose={() => setExpenseToUpdate(null)}
        key={expenseToUpdate?.id}
      /> */}

      {/* <ConfirmDialog
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
      /> */}
    </>
  );
};

export default SaleNoteList;
