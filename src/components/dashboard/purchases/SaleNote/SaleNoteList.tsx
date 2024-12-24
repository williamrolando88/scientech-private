import { Button, CardContent } from '@mui/material';
import { DataGrid, GridActionsCellItem, GridColDef } from '@mui/x-data-grid';
import ConfirmDialog from '@src/components/shared/confirm-dialog';
import Iconify from '@src/components/shared/iconify';
import { useCollectionSnapshot } from '@src/hooks/useCollectionSnapshot';
import { COLLECTIONS_ENUM } from '@src/lib/enums/collections';
import {
  purchaseConverter,
  PurchasesFirestore,
} from '@src/services/firestore/purchases';
import { SaleNote } from '@src/types/purchases';
import { useSnackbar } from 'notistack';
import { FC, useState } from 'react';
import UpdateSaleNote from './UpdateSaleNote';

const SaleNoteList: FC = () => {
  const { enqueueSnackbar } = useSnackbar();
  const [expenseToDelete, setExpenseToDelete] = useState<SaleNote | null>(null);
  const [expenseToUpdate, setExpenseToUpdate] = useState<SaleNote | null>(null);

  const saleNote = useCollectionSnapshot<SaleNote>({
    collectionName: COLLECTIONS_ENUM.SALE_NOTES,
    converter: purchaseConverter,
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
      field: 'sequentialNumber',
      headerName: 'Nro.',
      width: 80,
      sortable: false,
    },
    {
      field: 'issuerName',
      flex: 2,
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

    PurchasesFirestore.remove({ id: expenseToDelete.id })
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
          disableRowSelectionOnClick
          initialState={{ pagination: { paginationModel: { pageSize: 20 } } }}
          pageSizeOptions={[20, 50, 100]}
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
          <Button onClick={handleDeleteExpense} variant="contained">
            Borrar
          </Button>
        }
      />
    </>
  );
};

export default SaleNoteList;
