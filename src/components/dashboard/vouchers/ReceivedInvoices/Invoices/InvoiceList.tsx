import { CardContent } from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { useListExpensesByType } from '@src/hooks/cache/expenses';
import { Invoice } from '@src/types/expenses';
import { FC } from 'react';

const columns: GridColDef<Invoice>[] = [
  {
    field: 'issue_date',
    headerName: 'Fecha de Emisión',
    type: 'date',
    width: 130,
    sortable: false,
  },
  {
    field: 'establishment',
    headerName: 'Suc.',
    type: 'number',
    width: 50,
    sortable: false,
  },
  {
    field: 'emission_point',
    headerName: 'Pto.',
    type: 'number',
    width: 50,
    sortable: false,
  },
  {
    field: 'sequential_number',
    headerName: 'Nro.',
    type: 'number',
    width: 100,
    sortable: false,
  },
  {
    field: 'issuer_id',
    headerName: 'RUC',
    width: 180,
    sortable: false,
  },
  {
    field: 'issuer_name',
    flex: 1,
    headerName: 'Razón Social',
    sortable: false,
  },
  {
    field: 'tax_exempted_subtotal',
    headerName: 'Base 0%',
    type: 'number',
    sortable: false,
  },
  {
    field: 'taxed_subtotal',
    headerName: 'Base imponible',
    type: 'number',
    sortable: false,
  },
  {
    field: 'IVA',
    headerName: 'IVA',
    type: 'number',
    sortable: false,
  },
  {
    field: 'total',
    headerName: 'Total',
    type: 'number',
    sortable: false,
  },
];

const InvoiceList: FC = () => {
  const { data: invoices } = useListExpensesByType<Invoice>('invoice');

  return (
    <CardContent>
      <DataGrid
        autoHeight
        columns={columns}
        rows={invoices}
        disableColumnFilter
        initialState={{
          sorting: {
            sortModel: [{ field: 'issue_date', sort: 'desc' }],
          },
        }}
      />
    </CardContent>
  );
};

export default InvoiceList;
