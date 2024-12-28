import { CardContent, CardHeader } from '@mui/material';
import { DataGrid, GridActionsCellItem, GridColDef } from '@mui/x-data-grid';
import Iconify from '@src/components/shared/iconify';
import { useListAccountCategories } from '@src/hooks/cache/accountCategories';
import { useCollectionSnapshot } from '@src/hooks/useCollectionSnapshot';
import { COLLECTIONS_ENUM } from '@src/lib/enums/collections';
import { getTransactionDataByDetailId } from '@src/lib/modules/dayBook';
import { expandDoubleEntryAccounting } from '@src/lib/modules/doubleEntryAccounting';
import { doubleEntryAccountingConverter } from '@src/services/firestore/doubleEntryAccounting';
import {
  DoubleEntryAccounting,
  ExpandedTransaction,
} from '@src/types/doubleEntryAccounting';
import { FC, useCallback, useMemo, useState } from 'react';
import { DeleteDayBookTransaction } from './DeleteDayBookTransaction';
import { OpenDayBookTransaction } from './OpenDayBookTransaction';
import { UpdateDayBookTransaction } from './UpdateDayBookTransaction';

const DayBookIndex: FC = () => {
  const [transactionToUpdate, setTransactionToUpdate] =
    useState<DoubleEntryAccounting | null>(null);
  const [transactionToDelete, setTransactionToDelete] =
    useState<DoubleEntryAccounting | null>(null);
  const [transactionToOpen, setTransactionToOpen] =
    useState<DoubleEntryAccounting | null>(null);
  const { data: accountCategories } = useListAccountCategories();

  const doubleEntryAccounting = useCollectionSnapshot<DoubleEntryAccounting>({
    collectionName: COLLECTIONS_ENUM.DOUBLE_ENTRY_ACCOUNTING,
    converter: doubleEntryAccountingConverter,
    order: { field: 'issueDate', direction: 'desc' },
  });

  const getTransactionToDelete = useCallback(
    (detailId: string) => {
      const transaction = getTransactionDataByDetailId(
        detailId,
        doubleEntryAccounting
      );
      setTransactionToDelete(transaction);
    },
    [doubleEntryAccounting]
  );

  const getTransactionToUpdate = useCallback(
    (detailId: string) => {
      const transaction = getTransactionDataByDetailId(
        detailId,
        doubleEntryAccounting
      );
      setTransactionToUpdate(transaction);
    },
    [doubleEntryAccounting]
  );

  const getTransactionToOpen = useCallback(
    (detailId: string) => {
      const transaction = getTransactionDataByDetailId(
        detailId,
        doubleEntryAccounting
      );
      setTransactionToOpen(transaction);
    },
    [doubleEntryAccounting]
  );

  const columns: GridColDef<ExpandedTransaction>[] = useMemo(
    () => [
      {
        field: 'issueDate',
        headerName: 'Fecha',
        flex: 1,
        type: 'date',
      },
      {
        field: 'accountId',
        headerName: 'Cuenta contable',
        type: 'string',
        flex: 4,
        valueGetter: (params) =>
          `
      ${params.row.accountId} -
      ${accountCategories[params.row.accountId]?.name || ''}
      `,
      },
      {
        field: 'debit',
        headerName: 'Debe',
        headerAlign: 'center',
        type: 'number',
        flex: 1,
        align: 'center',
        valueFormatter: ({ value }) =>
          value ? `$${Number(value).toFixed(2)}` : '-',
      },
      {
        field: 'credit',
        headerName: 'Haber',
        headerAlign: 'center',
        type: 'number',
        flex: 1,
        align: 'center',
        valueFormatter: ({ value }) =>
          value ? `$${Number(value).toFixed(2)}` : '-',
      },
      {
        field: 'description',
        headerName: 'Descripción',
        type: 'string',
        flex: 6,
      },
      {
        field: 'actions',
        type: 'actions',
        width: 50,
        getActions: (params) => [
          <GridActionsCellItem
            label="Abrir"
            onClick={() => getTransactionToOpen(params.id as string)}
            icon={<Iconify icon="pajamas:doc-text" />}
            showInMenu
          />,
          <GridActionsCellItem
            label="Modificar"
            onClick={() => getTransactionToUpdate(params.id as string)}
            icon={<Iconify icon="pajamas:doc-changes" />}
            showInMenu
            disabled={params.row.locked}
          />,
          <GridActionsCellItem
            label="Borrar"
            onClick={() => getTransactionToDelete(params.id as string)}
            icon={<Iconify icon="pajamas:remove" />}
            showInMenu
            disabled={params.row.locked}
          />,
        ],
      },
    ],
    [
      accountCategories,
      getTransactionToOpen,
      getTransactionToUpdate,
      getTransactionToDelete,
    ]
  );

  const rows = useMemo(
    () => expandDoubleEntryAccounting(doubleEntryAccounting),
    [doubleEntryAccounting]
  );

  return (
    <>
      <CardHeader title="Listado de Transacciones" />

      <CardContent>
        <DataGrid
          columns={columns}
          rows={rows}
          density="compact"
          initialState={{
            pagination: { paginationModel: { pageSize: 20 } },
          }}
          pageSizeOptions={[20, 50, 100]}
          sx={{
            '& .MuiDataGrid-columnHeader': {
              bgcolor: (theme) => theme.palette.action.selected,
            },
          }}
          autoHeight
          disableRowSelectionOnClick
        />
      </CardContent>

      <OpenDayBookTransaction
        transaction={transactionToOpen}
        onClose={() => setTransactionToOpen(null)}
      />

      <UpdateDayBookTransaction
        setTransaction={setTransactionToUpdate}
        transaction={transactionToUpdate}
      />

      <DeleteDayBookTransaction
        transaction={transactionToDelete}
        onClose={() => setTransactionToDelete(null)}
      />
    </>
  );
};

export default DayBookIndex;
