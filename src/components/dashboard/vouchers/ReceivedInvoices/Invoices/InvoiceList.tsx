import { CardContent } from '@mui/material';
import { DataGrid, GridActionsCellItem, GridColDef } from '@mui/x-data-grid';
import Iconify from '@src/components/shared/iconify';
import { useListExpensesByType } from '@src/hooks/cache/expenses';
import { Invoice } from '@src/types/expenses';
import { FC, useState } from 'react';
import UpdateInvoice from './UpdateInvoice';

const InvoiceList: FC = () => {
  const [invoiceToUpdate, setInvoiceToUpdate] = useState<Invoice | null>(null);
  const { data: invoices, isLoading } =
    useListExpensesByType<Invoice>('invoice');

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
    {
      field: 'actions',
      type: 'actions',
      width: 50,
      getActions: (params) => [
        <GridActionsCellItem
          label="Modificar"
          onClick={() => setInvoiceToUpdate(params.row)}
          icon={<Iconify icon="pajamas:doc-changes" />}
          showInMenu
        />,
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

  return (
    <>
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
          loading={isLoading}
        />
      </CardContent>

      <UpdateInvoice
        open={!!invoiceToUpdate}
        initialValues={invoiceToUpdate}
        onClose={() => setInvoiceToUpdate(null)}
        key={invoiceToUpdate?.id}
      />
    </>
  );
};

export default InvoiceList;
