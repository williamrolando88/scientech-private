import { Button, CardContent } from '@mui/material';
import { DataGrid, GridActionsCellItem, GridColDef } from '@mui/x-data-grid';
import ConfirmDialog from '@src/components/shared/confirm-dialog';
import Iconify from '@src/components/shared/iconify';
import { useCollectionSnapshot } from '@src/hooks/useCollectionSnapshot';
import { COLLECTIONS_ENUM } from '@src/lib/enums/collections';
import {
  customsPaymentsConverter,
  FirestoreCustomsPayment,
} from '@src/services/firestore/purchases/customsPayments';
import { CustomsPayment } from '@src/types/purchases';
import { useSnackbar } from 'notistack';
import { FC, useState } from 'react';
import UpdateCustomsPayment from './UpdateCustomsPayment';

const CustomsPaymentsList: FC = () => {
  const { enqueueSnackbar } = useSnackbar();
  const [expenseToDelete, setExpenseToDelete] = useState<CustomsPayment | null>(
    null
  );
  const [expenseToUpdate, setExpenseToUpdate] = useState<CustomsPayment | null>(
    null
  );

  const customsPayments = useCollectionSnapshot<CustomsPayment>({
    collectionName: COLLECTIONS_ENUM.CUSTOMS_PAYMENTS,
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

    FirestoreCustomsPayment.remove(expenseToDelete.id)
      .then(() => {
        enqueueSnackbar('Liquidación aduanera eliminada exitosamente');
      })
      .catch((error) => {
        enqueueSnackbar(`No se pudo eliminar el documento: ${error}`, {
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
          rows={customsPayments}
          disableColumnFilter
          disableRowSelectionOnClick
          initialState={{
            pagination: { paginationModel: { pageSize: 20 } },
          }}
          pageSizeOptions={[20, 50, 100]}
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
        title="Borrar liquidación aduanera"
        action={
          <Button onClick={handleDeleteExpense} variant="contained">
            Borrar
          </Button>
        }
      />
    </>
  );
};

export default CustomsPaymentsList;
