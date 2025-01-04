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
import { CustomsPayment, Purchase } from '@src/types/purchases';
import { orderBy, where } from 'firebase/firestore';
import { useSnackbar } from 'notistack';
import { FC, useMemo, useState } from 'react';
import PaymentButton from '../Payments/PaymentButton';
import UpdateCustomsPayment from './UpdateCustomsPayment';

const CustomsPaymentsList: FC = () => {
  const { enqueueSnackbar } = useSnackbar();
  const [expenseToDelete, setExpenseToDelete] = useState<CustomsPayment | null>(
    null
  );
  const [expenseToUpdate, setExpenseToUpdate] = useState<CustomsPayment | null>(
    null
  );

  const purchases = useCollectionSnapshot<Purchase>({
    collectionName: COLLECTIONS_ENUM.PURCHASES,
    converter: purchaseConverter,
    additionalQueries: [
      where('type', '==', 'customsPayment'),
      orderBy('purchaseData.issueDate', 'desc'),
    ],
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
      width: 100,
      getActions: (params) => [
        <PaymentButton
          purchase={purchases.find((p) => p.id === params.row.id)}
        />,
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

  const rows = useMemo(
    () => purchases.map((d) => d.purchaseData) as CustomsPayment[],
    [purchases]
  );

  return (
    <>
      <CardContent>
        <DataGrid
          autoHeight
          columns={columns}
          rows={rows}
          disableColumnFilter
          disableRowSelectionOnClick
          initialState={{
            pagination: { paginationModel: { pageSize: 20 } },
          }}
          onRowClick={({ row }) => setExpenseToUpdate(row)}
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
