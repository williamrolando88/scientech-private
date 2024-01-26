import { Card } from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { FC } from 'react';
import { useListDayBookTransactions } from 'src/hooks/cache/dayBook';
import { DayBookTableEntry } from 'src/types/dayBook';

const DayBookIndex: FC = () => {
  const { data: dayBookTransactions, isLoading } = useListDayBookTransactions();

  const columns: GridColDef<DayBookTableEntry>[] = [
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
  ];

  const rows: DayBookTableEntry[] =
    dayBookTransactions
      ?.map((entry) =>
        entry.transactions.map((detail, index) => ({
          ...detail,
          id: `${entry.id}:${index}`,
          date: entry.date,
        }))
      )
      .flat() || [];

  return (
    <Card>
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
        autoHeight
        disableRowSelectionOnClick
      />
    </Card>
  );
};

export default DayBookIndex;
