import { Card, Stack, Typography } from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { round } from 'mathjs';
import { FC, useMemo } from 'react';
import { useListDayBookTransactions } from 'src/hooks/cache/dayBook';
import {
  getDayBookTransactions,
  getDecrementByAccount,
  getIncrementByAccount,
  getPositiveValueByAccount,
} from 'src/lib/modules/dayBook';
import { DayBookTableEntry } from 'src/types/dayBook';

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
];

interface AccountReportProps {
  account: string;
}
export const AccountReport: FC<AccountReportProps> = ({ account }) => {
  const { data: transactions } = useListDayBookTransactions();

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
    </>
  );
};
