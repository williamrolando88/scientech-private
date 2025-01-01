import { Card, CardContent } from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { NormalizedParsedWithholding } from '@src/types/documentParsers';
import { useSnackbar } from 'notistack';
import { FC, useEffect } from 'react';
import { DocumentViewerCustomToolbar } from './DocumentViewerCustomToolbar';

const columns: GridColDef<NormalizedParsedWithholding>[] = [
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
    valueGetter: ({ row }) => row.normalizedData.IncomeWithholdingPercentage,
  },
  {
    field: 'incomeTax',
    headerName: 'Renta',
    sortable: false,
    valueGetter: ({ row }) => row.normalizedData.IncomeWithholding,
  },
  {
    field: 'valueAddedTaxPercentage',
    headerName: '%IVA',
    sortable: false,
    valueGetter: ({ row }) => row.normalizedData.IVAWithholdingPercentage,
  },
  {
    field: 'valueAddedTax',
    headerName: 'IVA',
    sortable: false,
    valueGetter: ({ row }) => row.normalizedData.IVAWithholding,
  },
];

interface Props {
  data: (NormalizedParsedWithholding | null)[];
}

const getUnique = (docs: (NormalizedParsedWithholding | null)[]) => {
  const uniqueAccessKey = new Set();

  return docs.filter((doc) => {
    if (doc && !uniqueAccessKey.has(doc.infoTributaria.claveAcceso)) {
      uniqueAccessKey.add(doc.infoTributaria.claveAcceso);
      return true;
    }
    return false;
  }) as NormalizedParsedWithholding[];
};

export const HoldingDetailsViewer: FC<Props> = ({ data }) => {
  const { enqueueSnackbar } = useSnackbar();

  const filteredData = getUnique(data);

  useEffect(() => {
    const discardedDocuments = data.length - filteredData.length;
    if (discardedDocuments) {
      enqueueSnackbar(
        `Se encontraron ${discardedDocuments} retenciones duplicadas`,
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
