import { Button, CardContent } from '@mui/material';
import { DataGrid, GridActionsCellItem, GridColDef } from '@mui/x-data-grid';
import ConfirmDialog from '@src/components/shared/confirm-dialog';
import Iconify from '@src/components/shared/iconify';
import { useCollectionSnapshot } from '@src/hooks/useCollectionSnapshot';
import { fDate } from '@src/lib/utils/formatTime';
import { COLLECTIONS } from '@src/services/firestore/collections';
import {
  purchaseConverter,
  PurchasesFirestore,
} from '@src/services/firestore/purchases';
import { Purchase, SaleNote } from '@src/types/purchases';
import { orderBy, where } from 'firebase/firestore';
import { useSnackbar } from 'notistack';
import { FC, useMemo, useState } from 'react';
import PaymentButton from '../Payments/PaymentButton';
import ProjectTableAction from '../ProjectTableAction';
import UpdateSaleNote from './UpdateSaleNote';
import UpdatePurchasesProject from '../UpdatePurchasesProject';

const SaleNoteList: FC = () => {
  const { enqueueSnackbar } = useSnackbar();
  const [expenseToDelete, setExpenseToDelete] = useState<SaleNote | null>(null);
  const [expenseToUpdate, setExpenseToUpdate] = useState<SaleNote | null>(null);
  const [expenseToAttach, setExpenseToAttach] = useState<SaleNote | null>(null);

  const purchases = useCollectionSnapshot<Purchase>({
    collection: COLLECTIONS.PURCHASES,
    additionalQueries: [
      where('type', '==', 'saleNote'),
      orderBy('purchaseData.issueDate', 'desc'),
    ],
    converter: purchaseConverter,
  });

  const columns: GridColDef<SaleNote>[] = [
    {
      field: 'issueDate',
      headerName: 'Fecha de Emisión',
      type: 'date',
      width: 130,
      valueFormatter: (params) => fDate(params.value),
    },
    {
      field: 'sequentialNumber',
      headerName: 'Nro.',
      width: 80,
      sortable: false,
    },
    {
      field: 'issuerName',
      flex: 1,
      headerName: 'Emisor',
      sortable: false,
    },
    {
      field: 'description',
      flex: 3,
      headerName: 'Descripción',
      sortable: false,
    },
    {
      field: 'project',
      headerName: 'Proyecto',
      width: 90,
      sortable: false,
      type: 'actions',
      getActions: ({ row }) => [<ProjectTableAction row={row} />],
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
      getActions: ({ row }) => {
        const baseActions = [
          <GridActionsCellItem
            label="Modificar"
            onClick={() => setExpenseToUpdate(row)}
            icon={<Iconify icon="pajamas:doc-changes" />}
            showInMenu
            disabled={row.paid}
          />,
          <GridActionsCellItem
            label="Borrar"
            onClick={() => setExpenseToDelete(row)}
            icon={<Iconify icon="pajamas:remove" />}
            showInMenu
          />,
        ];

        if (row.paid) {
          baseActions.push(
            <GridActionsCellItem
              label="Modificar proyecto"
              onClick={() => setExpenseToAttach(row)}
              icon={<Iconify icon="pajamas:doc-symlink" />}
              showInMenu
            />
          );
        }

        return baseActions;
      },
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

  const rows = useMemo(
    () => purchases.map((d) => d.purchaseData) as SaleNote[],
    [purchases]
  );

  return (
    <>
      <CardContent>
        <DataGrid
          autoHeight
          columns={columns}
          rows={rows}
          disableRowSelectionOnClick
          initialState={{ pagination: { paginationModel: { pageSize: 20 } } }}
          pageSizeOptions={[20, 50, 100]}
          onRowClick={({ row }) => setExpenseToUpdate(row)}
        />
      </CardContent>

      <UpdateSaleNote
        open={!!expenseToUpdate}
        initialValues={expenseToUpdate}
        onClose={() => setExpenseToUpdate(null)}
        key={expenseToUpdate?.id}
      />

      <UpdatePurchasesProject
        open={!!expenseToAttach}
        purchase={expenseToAttach}
        onClose={() => setExpenseToAttach(null)}
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
