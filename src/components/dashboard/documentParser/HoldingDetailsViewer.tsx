import { Card, CardContent } from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { ParsedWithholding } from '@src/types/documentParsers';
import { get } from 'lodash';
import { round } from 'mathjs';
import { useSnackbar } from 'notistack';
import { FC, useEffect } from 'react';
import { DocumentViewerCustomToolbar } from './DocumentViewerCustomToolbar';

const holdingValueGetter = (
  docData: ParsedWithholding,
  requestedValue: 'valorImpuesto' | 'baseImponible'
) => {
  const taxValue =
    get(
      docData,
      `docsSustento.docSustento.impuestosDocSustento.impuestoDocSustento.${requestedValue}`
    ) ?? 0;

  const holdingValues = docData.docsSustento.docSustento.retenciones.retencion;

  const holding = holdingValues.find(
    (value) => Math.abs(value.baseImponible - taxValue) < 1
  );

  return holding ? round(holding.valorRetenido, 2) : 0;
};

const holdingPercentageValueGetter = (
  docData: ParsedWithholding,
  requestedValue: 'valorImpuesto' | 'baseImponible'
) => {
  const taxValue =
    get(
      docData,
      `docsSustento.docSustento.impuestosDocSustento.impuestoDocSustento.${requestedValue}`
    ) ?? 0;

  const holdingValues = docData.docsSustento.docSustento.retenciones.retencion;

  const holding = holdingValues.find(
    (value) => Math.abs(value.baseImponible - taxValue) < 1
  );

  return holding ? round(holding.porcentajeRetener, 2) : 0;
};

const columns: GridColDef<ParsedWithholding>[] = [
  {
    field: 'issueDate',
    headerName: 'Fecha de Emisión',
    type: 'string',
    width: 130,
    sortable: false,
    valueGetter: (params) => params.row.infoCompRetencion.fechaEmision,
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
    field: 'incomeTaxPercentage',
    headerName: '% Renta',
    sortable: false,
    valueGetter: (params) =>
      holdingPercentageValueGetter(params.row, 'baseImponible'),
  },
  {
    field: 'incomeTax',
    headerName: 'Renta',
    sortable: false,
    valueGetter: (params) => holdingValueGetter(params.row, 'baseImponible'),
  },
  {
    field: 'valueAddedTaxPercentage',
    headerName: '%IVA',
    sortable: false,
    valueGetter: (params) =>
      holdingPercentageValueGetter(params.row, 'valorImpuesto'),
  },
  {
    field: 'valueAddedTax',
    headerName: 'IVA',
    sortable: false,
    valueGetter: (params) => holdingValueGetter(params.row, 'valorImpuesto'),
  },
];

interface InvoiceDetailsViewerProps {
  data: ParsedWithholding[];
}

const getUniqueInvoice = (invoices: ParsedWithholding[]) => {
  const uniqueAccessKey = new Set();
  return invoices.filter((invoice) => {
    if (!uniqueAccessKey.has(invoice.infoTributaria.claveAcceso)) {
      uniqueAccessKey.add(invoice.infoTributaria.claveAcceso);
      return true;
    }
    return false;
  });
};

export const HoldingDetailsViewer: FC<InvoiceDetailsViewerProps> = ({
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
