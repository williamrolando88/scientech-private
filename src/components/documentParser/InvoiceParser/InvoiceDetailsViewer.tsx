import { Card, CardContent } from '@mui/material';
import { DataGrid, GridColumns, GridToolbarContainer, GridToolbarExport } from '@mui/x-data-grid';
import { round } from 'mathjs';
import { useSnackbar } from 'notistack';
import { FC, useEffect } from 'react';
import { Invoice } from 'src/@types/invoiceParsers';

const columns: GridColumns<Invoice> = [
  {
    field: 'issueDate',
    headerName: 'Fecha de Emisión',
    type: 'date',
    width: 130,
    sortable: false,
    valueGetter: (params) => params.row.infoFactura.fechaEmision,
  },
  {
    field: 'establishment',
    headerName: 'Suc.',
    width: 50,
    sortable: false,
    valueGetter: (params) => params.row.infoTributaria.estab,
  },
  {
    field: 'issuePoint',
    headerName: 'Pto.',
    width: 50,
    sortable: false,
    valueGetter: (params) => params.row.infoTributaria.ptoEmi,
  },
  {
    field: 'invoiceNumber',
    headerName: 'Nro.',
    width: 120,
    sortable: false,
    valueGetter: (params) => params.row.infoTributaria.secuencial,
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
      const value = params.row.infoFactura.totalConImpuestos.totalImpuesto;
      let result = 0;

      if (Array.isArray(value)) {
        const baseCero = value.find((tax) => tax.codigoPorcentaje === '0');
        result = Number(baseCero?.baseImponible || 0);
      } else {
        result = Number(value.codigoPorcentaje === '0' ? value.baseImponible : 0);
      }

      return round(result, 2);
    },
  },
  {
    field: 'baseTwelve',
    headerName: 'Base 12%',
    sortable: false,
    valueGetter: (params) => {
      const value = params.row.infoFactura.totalConImpuestos.totalImpuesto;
      let result = 0;

      if (Array.isArray(value)) {
        const baseTwelve = value.find((tax) => tax.codigoPorcentaje === '2');
        result = Number(baseTwelve?.baseImponible || 0);
      } else {
        result = Number(value.codigoPorcentaje === '2' ? value.baseImponible : 0);
      }

      return round(result, 2);
    },
  },
  {
    field: 'tax',
    headerName: 'IVA',
    sortable: false,
    valueGetter: (params) => {
      const value = params.row.infoFactura.totalConImpuestos.totalImpuesto;
      let result = 0;

      if (Array.isArray(value)) {
        const taxValue = value.find((tax) => tax.codigoPorcentaje === '2');
        result = Number(taxValue?.valor);
      } else {
        result = Number(value.codigoPorcentaje === '2' ? value.valor : 0);
      }

      return round(result, 2);
    },
  },
  {
    field: 'total',
    headerName: 'Total',
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
          disableColumnFilter
          rows={filteredData}
          getRowId={(row) => row.infoTributaria.claveAcceso}
          initialState={{
            sorting: {
              sortModel: [{ field: 'issueDate', sort: 'asc' }],
            },
          }}
          components={{
            Toolbar: CustomToolbar,
          }}
        />
      </CardContent>
    </Card>
  );
};

function CustomToolbar() {
  return (
    <GridToolbarContainer>
      <GridToolbarExport />
    </GridToolbarContainer>
  );
}
