import { Card, Stack, Typography } from '@mui/material';
import { DataGrid, GridActionsCellItem, GridColDef } from '@mui/x-data-grid';
import { round } from 'mathjs';
import { FC, useCallback, useMemo, useState } from 'react';
import Iconify from 'src/components/shared/iconify';
import { useListDayBookTransactions } from 'src/hooks/cache/dayBook';
import {
  getDayBookTransactions,
  getDecrementByAccount,
  getIncrementByAccount,
  getPositiveValueByAccount,
  getTransactionDataByDetailId,
} from 'src/lib/modules/dayBook';
import { DayBookTableEntry, DayBookTransaction } from 'src/types/dayBook';
import { OpenDayBookTransaction } from '../DayBookIndex/OpenDayBookTransaction';
import { UpdateDayBookTransaction } from '../DayBookIndex/UpdateDayBookTransaction';

interface AccountReportProps {
  account: string;
}
export const AccountReport: FC<AccountReportProps> = ({ account }) => {
  const { data: transactions } = useListDayBookTransactions();
  const [transactionToOpen, setTransactionToOpen] =
    useState<DayBookTransaction | null>(null);
  const [transactionToUpdate, setTransactionToUpdate] =
    useState<DayBookTransaction | null>(null);

  const getTransactionToOpen = useCallback(
    (detailId: string) => {
      const transaction = getTransactionDataByDetailId(detailId, transactions);
      setTransactionToOpen(transaction);
    },
    [transactions]
  );

  const getTransactionToUpdate = useCallback(
    (detailId: string) => {
      const transaction = getTransactionDataByDetailId(detailId, transactions);
      setTransactionToUpdate(transaction);
    },
    [transactions]
  );

  const columns: GridColDef<DayBookTableEntry>[] = [
    {
      field: 'date',
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
      field: 'quotation_id',
      headerName: 'Cotización',
      flex: 1,
      type: 'number',
      headerAlign: 'center',
      align: 'center',
    },
    {
      field: 'invoice_id',
      headerName: 'Factura',
      flex: 1,
      type: 'number',
      headerAlign: 'center',
      align: 'center',
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
        />,
        // <GridActionsCellItem
        //   label="Borrar"
        //   onClick={() => getTransactionToDelete(params.id as string)}
        //   icon={<Iconify icon="pajamas:remove" />}
        //   showInMenu
        // />,
      ],
    },
  ];

  const dayBookTableEntries = useMemo(
    () =>
      getDayBookTransactions(transactions).filter(
        (t) => t.account_id === account
      ),
    [transactions, account]
  );

  const balanceReport = useMemo(
    () =>
      dayBookTableEntries.reduce(
        (acc, current) => acc + getPositiveValueByAccount(current),
        0
      ),
    [dayBookTableEntries]
  );

  const totalIncrement = useMemo(
    () =>
      dayBookTableEntries.reduce(
        (acc, current) => acc + getIncrementByAccount(current),
        0
      ),
    [dayBookTableEntries]
  );

  const totalDecrement = useMemo(
    () =>
      dayBookTableEntries.reduce(
        (acc, current) => acc + getDecrementByAccount(current),
        0
      ),
    [dayBookTableEntries]
  );

  return (
    <>
      <Stack justifyContent="space-between" direction="row">
        <Typography>
          Total increment: <strong>${round(totalIncrement, 2)}</strong>
        </Typography>
        <Typography>
          Total decremento: <strong>${round(totalDecrement, 2)}</strong>
        </Typography>
        <Typography>
          Saldo actual: <strong>${round(balanceReport, 2)}</strong>
        </Typography>
      </Stack>

      <Card variant="outlined">
        <DataGrid
          rows={dayBookTableEntries}
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
    </>
  );
};
