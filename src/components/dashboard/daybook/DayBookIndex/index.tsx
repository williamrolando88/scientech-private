import { CardContent, CardHeader } from '@mui/material';
import { DataGrid, GridActionsCellItem, GridColDef } from '@mui/x-data-grid';
import { useListAccountCategories } from '@src/hooks/cache/accountCategories';
import { FC, useCallback, useMemo, useState } from 'react';
import Iconify from 'src/components/shared/iconify';
import { useListDayBookTransactions } from 'src/hooks/cache/dayBook';
import {
  getDayBookTransactions,
  getTransactionDataByDetailId,
} from 'src/lib/modules/dayBook';
import { DayBookTableEntryOld, DayBookTransactionOld } from 'src/types/dayBook';
import { DeleteDayBookTransaction } from './DeleteDayBookTransaction';
import { OpenDayBookTransaction } from './OpenDayBookTransaction';
import { UpdateDayBookTransaction } from './UpdateDayBookTransaction';

const DayBookIndex: FC = () => {
  const [transactionToDelete, setTransactionToDelete] =
    useState<DayBookTransactionOld | null>(null);
  const [transactionToUpdate, setTransactionToUpdate] =
    useState<DayBookTransactionOld | null>(null);
  const [transactionToOpen, setTransactionToOpen] =
    useState<DayBookTransactionOld | null>(null);
  const { data: dayBookTransactions, isLoading } = useListDayBookTransactions();
  const { data: accountCategories } = useListAccountCategories();

  const getTransactionToDelete = useCallback(
    (detailId: string) => {
      const transaction = getTransactionDataByDetailId(
        detailId,
        dayBookTransactions
      );
      setTransactionToDelete(transaction);
    },
    [dayBookTransactions]
  );

  const getTransactionToUpdate = useCallback(
    (detailId: string) => {
      const transaction = getTransactionDataByDetailId(
        detailId,
        dayBookTransactions
      );
      setTransactionToUpdate(transaction);
    },
    [dayBookTransactions]
  );

  const getTransactionToOpen = useCallback(
    (detailId: string) => {
      const transaction = getTransactionDataByDetailId(
        detailId,
        dayBookTransactions
      );
      setTransactionToOpen(transaction);
    },
    [dayBookTransactions]
  );

  const columns: GridColDef<DayBookTableEntryOld>[] = useMemo(
    () => [
      {
        field: 'date',
        headerName: 'Fecha',
        flex: 1,
        type: 'date',
        valueFormatter: ({ value }) =>
          new Date(value as string).toLocaleDateString(),
      },
      {
        field: 'account_id',
        headerName: 'Cuenta contable',
        type: 'string',
        flex: 4,
        valueGetter: (params) =>
          `
      ${params.row.account_id} -
      ${accountCategories[params.row.account_id]?.name || ''}
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

  const rows: DayBookTableEntryOld[] = useMemo(
    () => getDayBookTransactions(dayBookTransactions),
    [dayBookTransactions]
  );

  return (
    <>
      <CardHeader title="Listado de Transacciones" />

      <CardContent>
        <DataGrid
          columns={columns}
          rows={rows}
          loading={isLoading}
          density="compact"
          initialState={{
            sorting: {
              sortModel: [{ field: 'date', sort: 'desc' }],
            },
          }}
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
