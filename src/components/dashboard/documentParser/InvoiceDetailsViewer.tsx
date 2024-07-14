import { Card, CardContent } from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { round } from 'mathjs';
import { useSnackbar } from 'notistack';
import { FC, useEffect } from 'react';
import { ParsedInvoice } from '@src/types/documentParsers';
import { DocumentViewerCustomToolbar } from './DocumentViewerCustomToolbar';

const baseTaxValueGetter = (docData: ParsedInvoice, code: number): number => {
  const value = docData.infoFactura.totalConImpuestos.totalImpuesto;
  let result: number;

  if (Array.isArray(value)) {
    const base = value.find((tax) => tax.codigoPorcentaje === code);
    result = base?.baseImponible || 0;
  } else {
    result = value.codigoPorcentaje === code ? value.baseImponible : 0;
  }

  return result ? round(result, 2) : 0;
};

const columns: GridColDef<ParsedInvoice>[] = [
  {
    field: 'issueDate',
    headerName: 'Fecha de Emisión',
    type: 'string',
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
    valueGetter: (params) => baseTaxValueGetter(params.row, 0),
  },
  {
    field: 'baseTwelve',
    headerName: 'Base 12%',
    sortable: false,
    valueGetter: (params) => baseTaxValueGetter(params.row, 2),
  },
  {
    field: 'baseFifteen',
    headerName: 'Base 15%',
    sortable: false,
    valueGetter: (params) => baseTaxValueGetter(params.row, 4),
  },
  {
    field: 'tax',
    headerName: 'IVA',
    sortable: false,
    valueGetter: (params) => {
      const value = params.row.infoFactura.totalConImpuestos.totalImpuesto;
      let result: number;

      if (Array.isArray(value)) {
        const taxValue = value.find((tax) => tax.codigoPorcentaje !== 0);
        result = taxValue?.valor || 0;
      } else {
        result = value.codigoPorcentaje !== 0 ? value.valor : 0;
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
  data: ParsedInvoice[];
}

const getUniqueInvoice = (invoices: ParsedInvoice[]) => {
  const uniqueAccessKey = new Set();
  return invoices.filter((invoice) => {
    if (!uniqueAccessKey.has(invoice.infoTributaria.claveAcceso)) {
      uniqueAccessKey.add(invoice.infoTributaria.claveAcceso);
      return true;
    }
    return false;
  });
};

export const InvoiceDetailsViewer: FC<InvoiceDetailsViewerProps> = ({
  data,
}) => {
  const { enqueueSnackbar } = useSnackbar();

  const filteredData = getUniqueInvoice(data);

  useEffect(() => {
    const discardedInvoices = data.length - filteredData.length;
    if (discardedInvoices) {
      enqueueSnackbar(
        `Se encontraron ${discardedInvoices} facturas duplicadas`,
        {
          variant: 'info',
        }
      );
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
          slots={{
            toolbar: DocumentViewerCustomToolbar,
          }}
        />
      </CardContent>
    </Card>
  );
};
