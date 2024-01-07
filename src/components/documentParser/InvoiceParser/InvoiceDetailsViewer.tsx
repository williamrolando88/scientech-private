import { Card, CardContent } from '@mui/material';
import { DataGrid, GridColumns } from '@mui/x-data-grid';
import { FC } from 'react';
import { Invoice } from 'src/@types/invoiceParsers';

const columns: GridColumns<Invoice> = [
  {
    field: 'issuer',
    headerName: 'Razón Social',
    flex: 1,
    resizable: false,
    minWidth: 200,
    valueGetter: (params) => params.row.infoTributaria.razonSocial,
  },
];
interface InvoiceDetailsViewerProps {
  data: Invoice[];
}
export const InvoiceDetailsViewer: FC<InvoiceDetailsViewerProps> = ({ data }) => (
  <Card>
    <CardContent>
      <DataGrid
        autoHeight
        columns={columns}
        rows={data}
        getRowId={(row) => row.infoTributaria.claveAcceso}
      />
    </CardContent>
  </Card>
);
