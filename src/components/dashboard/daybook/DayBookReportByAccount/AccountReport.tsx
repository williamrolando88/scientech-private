import { Card, Stack, Typography } from '@mui/material';
import { DataGrid, GridActionsCellItem, GridColDef } from '@mui/x-data-grid';
import Iconify from '@src/components/shared/iconify';
import { expandDoubleEntryAccounting } from '@src/lib/modules/doubleEntryAccounting';
import {
  DoubleEntryAccounting,
  ExpandedTransaction,
} from '@src/types/doubleEntryAccounting';
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
  accountingData: DoubleEntryAccounting[];
}

export const AccountReport: FC<AccountReportProps> = ({
  account,
  accountingData,
}) => {
  const [transactionToOpen, setTransactionToOpen] =
    useState<DoubleEntryAccounting | null>(null);
  const [transactionToUpdate, setTransactionToUpdate] =
    useState<DoubleEntryAccounting | null>(null);
  const [transactionToDelete, setTransactionToDelete] =
    useState<DoubleEntryAccounting | null>(null);

  const getTransactionToOpen = useCallback(
    (detailId: string) => {
      const transaction = getTransactionDataByDetailId(
        detailId,
        accountingData
      );
      setTransactionToOpen(transaction);
    },
    [accountingData]
  );

  const getTransactionToUpdate = useCallback(
    (detailId: string) => {
      const transaction = getTransactionDataByDetailId(
        detailId,
        accountingData
      );
      setTransactionToUpdate(transaction);
    },
    [accountingData]
  );

  const getTransactionToDelete = useCallback(
    (detailId: string) => {
      const transaction = getTransactionDataByDetailId(
        detailId,
        accountingData
      );
      setTransactionToDelete(transaction);
    },
    [accountingData]
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
      expandDoubleEntryAccounting(accountingData).filter(
        (r) => r.accountId === account
      ),
    [accountingData, account]
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

  const balanceReport = useMemo(
    () =>
      rows.reduce(
        (acc, current) => acc + getPositiveValueByAccount(current),
        0
      ),
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
          onRowClick={({ id }) => getTransactionToOpen(id as string)}
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
