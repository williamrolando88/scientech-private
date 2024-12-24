import { Card, Stack, Typography } from '@mui/material';
import { DataGrid, GridActionsCellItem, GridColDef } from '@mui/x-data-grid';
import Iconify from '@src/components/shared/iconify';
import { useCollectionSnapshot } from '@src/hooks/useCollectionSnapshot';
import { COLLECTIONS_ENUM } from '@src/lib/enums/collections';
import { expandDoubleEntryAccounting } from '@src/lib/modules/doubleEntryAccounting';
import { doubleEntryAccountingConverter } from '@src/services/firestore/doubleEntryAccounting';
import {
  DoubleEntryAccounting,
  ExpandedTransaction,
} from '@src/types/doubleEntryAccounting';
import { where } from 'firebase/firestore';
import { round } from 'mathjs';
import { FC, useCallback, useMemo, useState } from 'react';
import {
  getDecrementByAccount,
  getIncrementByAccount,
  getPositiveValueByAccount,
  getTransactionDataByDetailId,
} from 'src/lib/modules/dayBook';
import { DeleteDayBookTransaction } from '../DayBookIndex/DeleteDayBookTransaction';
import { OpenDayBookTransaction } from '../DayBookIndex/OpenDayBookTransaction';
import { UpdateDayBookTransaction } from '../DayBookIndex/UpdateDayBookTransaction';

interface AccountReportProps {
  account: string;
}

export const AccountReport: FC<AccountReportProps> = ({ account }) => {
  const [transactionToOpen, setTransactionToOpen] =
    useState<DoubleEntryAccounting | null>(null);
  const [transactionToUpdate, setTransactionToUpdate] =
    useState<DoubleEntryAccounting | null>(null);
  const [transactionToDelete, setTransactionToDelete] =
    useState<DoubleEntryAccounting | null>(null);

  const doubleEntryAccounting = useCollectionSnapshot<DoubleEntryAccounting>({
    collectionName: COLLECTIONS_ENUM.DOUBLE_ENTRY_ACCOUNTING,
    converter: doubleEntryAccountingConverter,
    order: { field: 'issueDate', direction: 'desc' },
    additionalQueries: [where('accounts', 'array-contains', account)],
  });

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

  const columns: GridColDef<ExpandedTransaction>[] = [
    {
      field: 'issueDate',
      headerName: 'Fecha',
      flex: 1,
      type: 'date',
      headerAlign: 'left',
    },
    {
      field: 'amount',
      headerName: 'Monto',
      flex: 1,
      type: 'number',
      headerAlign: 'center',
      align: 'center',
      valueGetter: (params) => getPositiveValueByAccount(params.row),
      valueFormatter: ({ value }) =>
        value ? `$${Number(value).toFixed(2)}` : '-',
    },
    {
      field: 'description',
      headerName: 'Descripción',
      flex: 3,
      headerAlign: 'left',
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
          disabled={params.row.locked}
          showInMenu
        />,
        <GridActionsCellItem
          label="Borrar"
          onClick={() => getTransactionToDelete(params.id as string)}
          icon={<Iconify icon="pajamas:remove" />}
          disabled={params.row.locked}
          showInMenu
        />,
      ],
    },
  ];

  const rows = useMemo(
    () =>
      expandDoubleEntryAccounting(doubleEntryAccounting).filter(
        (r) => r.accountId === account
      ),
    [doubleEntryAccounting, account]
  );

  const balanceReport = useMemo(
    () =>
      rows.reduce(
        (acc, current) => acc + getPositiveValueByAccount(current),
        0
      ),
    [rows]
  );

  const totalIncrement = useMemo(
    () =>
      rows.reduce((acc, current) => acc + getIncrementByAccount(current), 0),
    [rows]
  );

  const totalDecrement = useMemo(
    () =>
      rows.reduce((acc, current) => acc + getDecrementByAccount(current), 0),
    [rows]
  );

  return (
    <>
      <Stack justifyContent="space-between" direction="row">
        <Typography>
          Incremento total: <strong>${round(totalIncrement, 2)}</strong>
        </Typography>

        <Typography>
          Decremento total: <strong>${round(totalDecrement, 2)}</strong>
        </Typography>

        <Typography>
          Saldo actual: <strong>${round(balanceReport, 2)}</strong>
        </Typography>
      </Stack>

      <Card variant="outlined">
        <DataGrid
          rows={rows}
          columns={columns}
          autoHeight
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
          disableRowSelectionOnClick
        />
      </Card>

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
