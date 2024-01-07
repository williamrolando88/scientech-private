import { Card, CardContent } from '@mui/material';
import { DataGrid, GridColumns } from '@mui/x-data-grid';
import { useSnackbar } from 'notistack';
import { FC, useEffect } from 'react';
import { Invoice } from 'src/@types/invoiceParsers';

const columns: GridColumns<Invoice> = [
  {
    field: 'issueDate',
    headerName: 'Fecha de Emisión',
    type: 'date',
    width: 150,
    sortable: false,
    valueGetter: (params) => params.row.infoFactura.fechaEmision,
  },
  {
    field: 'establishment',
    headerName: 'Suc.',
    width: 80,
    sortable: false,
    valueGetter: (params) => params.row.infoTributaria.estab,
  },
  {
    field: 'issuePoint',
    headerName: 'Pto.',
    width: 80,
    sortable: false,
    valueGetter: (params) => params.row.infoTributaria.ptoEmi,
  },
  {
    field: 'invoiceNumber',
    headerName: 'Nro.',
    width: 80,
    sortable: false,
    valueGetter: (params) => params.row.infoTributaria.codDoc,
  },
  {
    field: 'issuer',
    flex: 1,
    headerName: 'Razón Social',
    sortable: false,
    valueGetter: (params) => params.row.infoTributaria.razonSocial,
  },
  {
    field: 'baseCero',
    headerName: 'Base 0%',
    sortable: false,
    valueGetter: (params) => {
      console.log(params.row.infoFactura.totalConImpuestos.totalImpuesto);
      return 0;
    },
  },
  {
    field: 'baseTwelve',
    headerName: 'Base 12%',
    sortable: false,
    valueGetter: (params) => params.row.infoFactura.totalConImpuestos.totalImpuesto,
  },
  {
    field: 'tax',
    headerName: 'IVA',
    sortable: false,
    valueGetter: (params) => params.row.infoFactura.totalConImpuestos.totalImpuesto,
  },
  {
    field: 'total',
    headerName: 'total',
    sortable: false,
    valueGetter: (params) => params.row.infoFactura.importeTotal,
  },
];

interface InvoiceDetailsViewerProps {
  data: Invoice[];
}

const getUniqueInvoice = (invoices: Invoice[]) => {
  const uniqueAccessKey = new Set();
  return invoices.filter((invoice) => {
    if (!uniqueAccessKey.has(invoice.infoTributaria.claveAcceso)) {
      uniqueAccessKey.add(invoice.infoTributaria.claveAcceso);
      return true;
    }
    return false;
  });
};

export const InvoiceDetailsViewer: FC<InvoiceDetailsViewerProps> = ({ data }) => {
  const { enqueueSnackbar } = useSnackbar();

  const filteredData = getUniqueInvoice(data);

  useEffect(() => {
    const discardedInvoices = data.length - filteredData.length;
    if (discardedInvoices) {
      enqueueSnackbar(`Se encontraron ${discardedInvoices} facturas duplicadas`, {
        variant: 'info',
      });
    }
  }, [data, enqueueSnackbar, filteredData]);

  return (
    <Card>
      <CardContent>
        <DataGrid
          autoHeight
          columns={columns}
          rows={filteredData}
          getRowId={(row) => row.infoTributaria.claveAcceso}
          initialState={{
            sorting: {
              sortModel: [{ field: 'issueDate', sort: 'asc' }],
            },
          }}
        />
      </CardContent>
    </Card>
  );
};
