import { Card, CardContent, CardHeader } from '@mui/material';
import { DataGrid, GridActionsCellItem, GridColDef } from '@mui/x-data-grid';
import { FC, useCallback, useMemo, useState } from 'react';
import Iconify from 'src/components/shared/iconify';
import { useListDayBookTransactions } from 'src/hooks/cache/dayBook';
import { getTransactionDataByDetailId } from 'src/lib/modules/dayBook';
import { DayBookTableEntry, DayBookTransaction } from 'src/types/dayBook';
import { DeleteDayBookTransaction } from './DeleteDayBookTransaction';
import { UpdateDayBookTransactionForm } from './UpdateDayBookTransactionForm';

const DayBookIndex: FC = () => {
  const [transactionToDelete, setTransactionToDelete] =
    useState<DayBookTransaction | null>(null);
  const [transactionToUpdate, setTransactionToUpdate] =
    useState<DayBookTransaction | null>(null);
  const { data: dayBookTransactions, isLoading } = useListDayBookTransactions();

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

  const columns: GridColDef<DayBookTableEntry>[] = useMemo(
    () => [
      {
        field: 'date',
        headerName: 'Fecha',
        flex: 2,
        type: 'date',
        valueFormatter: ({ value }) =>
          new Date(value as string).toLocaleDateString(),
      },
      {
        field: 'account_id',
        headerName: 'Cuenta contable',
        type: 'string',
        flex: 3,
      },
      {
        field: 'debit',
        headerName: 'Debe',
        headerAlign: 'center',
        type: 'number',
        flex: 2,
        align: 'center',
        valueFormatter: ({ value }) =>
          value ? `$${Number(value).toFixed(2)}` : '-',
      },
      {
        field: 'credit',
        headerName: 'Haber',
        headerAlign: 'center',
        type: 'number',
        flex: 2,
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
        field: 'quotation_id',
        headerName: 'Cotización No.',
        headerAlign: 'center',
        type: 'number',
        flex: 2,
        align: 'center',
        valueFormatter: ({ value }) => value || '-',
      },
      {
        field: 'invoice_id',
        headerName: 'Factura No.',
        headerAlign: 'center',
        type: 'number',
        flex: 2,
        align: 'center',
        valueFormatter: ({ value }) => value || '-',
      },
      {
        field: 'actions',
        type: 'actions',
        width: 50,
        getActions: (params) => [
          <GridActionsCellItem
            label="Modificar"
            onClick={() => getTransactionToUpdate(params.id as string)}
            icon={<Iconify icon="pajamas:doc-changes" />}
            showInMenu
          />,
          <GridActionsCellItem
            label="Borrar"
            onClick={() => getTransactionToDelete(params.id as string)}
            icon={<Iconify icon="pajamas:remove" />}
            showInMenu
          />,
        ],
      },
    ],
    [getTransactionToDelete, getTransactionToUpdate]
  );

  const rows: DayBookTableEntry[] = useMemo(
    () =>
      (dayBookTransactions || [])
        .map((entry) =>
          (entry.transactions || []).map((detail, index) => ({
            ...detail,
            id: `${entry.id}:${index}`,
            date: entry.date,
          }))
        )
        .flat(),
    [dayBookTransactions]
  );

  return (
    <Card>
      <CardHeader title="Libro Diario" />
      <CardContent>
        <DataGrid
          columns={columns}
          rows={rows}
          loading={isLoading}
          density="compact"
          initialState={{
            sorting: {
              sortModel: [{ field: 'date', sort: 'asc' }],
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
      <UpdateDayBookTransactionForm
        setTransaction={setTransactionToUpdate}
        transaction={transactionToUpdate}
      />
      <DeleteDayBookTransaction
        transaction={transactionToDelete}
        setTransaction={setTransactionToDelete}
      />
    </Card>
  );
};

export default DayBookIndex;
