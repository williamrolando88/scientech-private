import { Card, Stack, Typography } from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { useCollectionSnapshot } from '@src/hooks/useCollectionSnapshot';
import { COLLECTIONS } from '@src/lib/enums/collections';
import { doubleEntryAccountingConverter } from '@src/services/firebase/doubleEntryAccounting';
import { DoubleEntryAccounting } from '@src/types/doubleEntryAccounting';
import { where } from 'firebase/firestore';
import { round } from 'mathjs';
import { FC, useMemo } from 'react';
import { useListDayBookTransactions } from 'src/hooks/cache/dayBook';
import {
  getDayBookTransactions,
  getDecrementByAccount,
  getIncrementByAccount,
  getPositiveValueByAccount,
} from 'src/lib/modules/dayBook';
import { DayBookTableEntryOld } from 'src/types/dayBook';

interface AccountReportProps {
  account: string;
}

export const AccountReport: FC<AccountReportProps> = ({ account }) => {

  const location = `transactions.\`${account}\`.accountId`;

  const doubleEntryAccounting = useCollectionSnapshot<DoubleEntryAccounting>({
    collectionName: COLLECTIONS.DOUBLE_ENTRY_ACCOUNTING,
    converter: doubleEntryAccountingConverter,
    additionalQueries: account
      ? [where(location, '==', account)]
      : [],
    order: { field: 'issueDate', direction: 'desc' },
  });

  console.log(doubleEntryAccounting);
  console.log(location);

  const { data: transactions } = useListDayBookTransactions();
  // const [transactionToOpen, setTransactionToOpen] =
  //   useState<DayBookTransactionOld | null>(null);
  // const [transactionToUpdate, setTransactionToUpdate] =
  //   useState<DayBookTransactionOld | null>(null);
  // const [transactionToDelete, setTransactionToDelete] =
  //   useState<DayBookTransactionOld | null>(null);

  // const getTransactionToOpen = useCallback(
  //   (detailId: string) => {
  //     const transaction = getTransactionDataByDetailId(detailId, transactions);
  //     setTransactionToOpen(transaction);
  //   },
  //   [transactions]
  // );

  // const getTransactionToUpdate = useCallback(
  //   (detailId: string) => {
  //     const transaction = getTransactionDataByDetailId(detailId, transactions);
  //     setTransactionToUpdate(transaction);
  //   },
  //   [transactions]
  // );

  // const getTransactionToDelete = useCallback(
  //   (detailId: string) => {
  //     const transaction = getTransactionDataByDetailId(detailId, transactions);
  //     setTransactionToDelete(transaction);
  //   },
  //   [transactions]
  // );

  const columns: GridColDef<DayBookTableEntryOld>[] = [
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
      field: 'actions',
      type: 'actions',
      width: 50,
      getActions: (params) => [
        // <GridActionsCellItem
        //   label="Abrir"
        //   onClick={() => getTransactionToOpen(params.id as string)}
        //   icon={<Iconify icon="pajamas:doc-text" />}
        //   showInMenu
        // />,
        // <GridActionsCellItem
        //   label="Modificar"
        //   onClick={() => getTransactionToUpdate(params.id as string)}
        //   icon={<Iconify icon="pajamas:doc-changes" />}
        //   showInMenu
        // />,
        // <GridActionsCellItem
        //   label="Borrar"
        //   onClick={() => getTransactionToDelete(params.id as string)}
        //   icon={<Iconify icon="pajamas:remove" />}
        //   showInMenu
        //   disabled={params.row.locked}
        // />,
      ],
    },
  ];

  const dayBookTableEntries = useMemo(
    () =>
      getDayBookTransactions(transactions).filter(
        (t) => t.account_id === account,
      ),
    [transactions, account],
  );

  const balanceReport = useMemo(
    () =>
      dayBookTableEntries.reduce(
        (acc, current) => acc + getPositiveValueByAccount(current),
        0,
      ),
    [dayBookTableEntries],
  );

  const totalIncrement = useMemo(
    () =>
      dayBookTableEntries.reduce(
        (acc, current) => acc + getIncrementByAccount(current),
        0,
      ),
    [dayBookTableEntries],
  );

  const totalDecrement = useMemo(
    () =>
      dayBookTableEntries.reduce(
        (acc, current) => acc + getDecrementByAccount(current),
        0,
      ),
    [dayBookTableEntries],
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

      {/* <OpenDayBookTransaction
        transaction={transactionToOpen}
        onClose={() => setTransactionToOpen(null)}
      /> */}

      {/* <UpdateDayBookTransaction
        setTransaction={setTransactionToUpdate}
        transaction={transactionToUpdate}
      /> */}

      {/* <DeleteDayBookTransaction
        transaction={transactionToDelete}
        onClose={() => setTransactionToDelete(null)}
      /> */}
    </>
  );
};
