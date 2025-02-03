import { Button, CardContent } from '@mui/material';
import { DataGrid, GridActionsCellItem, GridColDef } from '@mui/x-data-grid';
import ConfirmDialog from '@src/components/shared/confirm-dialog';
import Iconify from '@src/components/shared/iconify';
import Label from '@src/components/shared/label';
import { useListProjects } from '@src/hooks/cache/projects';
import { useCollectionSnapshot } from '@src/hooks/useCollectionSnapshot';
import { fDate } from '@src/lib/utils/formatTime';
import { PATH_DASHBOARD } from '@src/routes/paths';
import { COLLECTIONS } from '@src/services/firestore/collections';
import {
  purchaseConverter,
  PurchasesFirestore,
} from '@src/services/firestore/purchases';
import { Purchase, ReceivedInvoice } from '@src/types/purchases';
import { orderBy, where } from 'firebase/firestore';
import Link from 'next/link';
import { useSnackbar } from 'notistack';
import { FC, useMemo, useState } from 'react';
import PaymentButton from '../Payments/PaymentButton';
import UpdatePurchasesProject from '../UpdatePurchasesProject';
import UpdateInvoice from './UpdateInvoice';

const InvoiceList: FC = () => {
  const { data: projectsList } = useListProjects();
  const { enqueueSnackbar } = useSnackbar();
  const [expenseToDelete, setExpenseToDelete] =
    useState<ReceivedInvoice | null>(null);
  const [expenseToUpdate, setExpenseToUpdate] =
    useState<ReceivedInvoice | null>(null);
  const [expenseToAttach, setExpenseToAttach] =
    useState<ReceivedInvoice | null>(null);

  const purchases = useCollectionSnapshot<Purchase>({
    collection: COLLECTIONS.PURCHASES,
    converter: purchaseConverter,
    additionalQueries: [
      where('type', '==', 'receivedInvoice'),
      orderBy('purchaseData.issueDate', 'desc'),
    ],
  });

  const columns: GridColDef<ReceivedInvoice>[] = [
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
      headerName: 'Razón Social',
      sortable: false,
    },
    {
      field: 'project',
      headerName: 'Proyecto',
      width: 90,
      sortable: false,
      type: 'actions',
      getActions: ({ row }) => {
        const projectNumber =
          row.ref?.projectId && projectsList
            ? projectsList.find((p) => p.id === row.ref?.projectId)?.number
            : null;

        if (!projectNumber) return [<Label>N/A</Label>];

        return [
          <Link
            target="_blank"
            href={PATH_DASHBOARD.projects.open(row.ref?.projectId ?? '')}
          >
            <Label variant="soft" color="info" sx={{ cursor: 'pointer' }}>
              {projectNumber}
              <Iconify icon="pajamas:external-link" sx={{ ml: 1 }} width={15} />
            </Label>
          </Link>,
        ];
      },
    },
    {
      field: 'total',
      headerName: 'Total',
      type: 'number',
      width: 100,
      sortable: false,
      valueFormatter: ({ value }) =>
        value ? `$ ${Number(value).toFixed(2)}` : '-',
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

  const handleDeleteExpense = () => {
    if (!expenseToDelete?.id) return;

    PurchasesFirestore.remove({ id: expenseToDelete.id })
      .then(() => {
        enqueueSnackbar('Factura eliminada exitosamente');
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
    () => purchases.map((d) => d.purchaseData) as ReceivedInvoice[],
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

      <UpdateInvoice
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
