import { Button, Stack } from '@mui/material';
import { useState } from 'react';
import { DropdownSection } from 'src/components/dashboard/documentParser/InvoiceParser/DropdownSection';
import { InvoiceDetailsViewer } from 'src/components/dashboard/documentParser/InvoiceParser/InvoiceDetailsViewer';
import DashboardLayout from 'src/components/shared/layouts/dashboard/DashboardLayout';
import DashboardTemplate from 'src/components/shared/layouts/dashboard/DashboardTemplate';
import { ParsedInvoice } from 'src/types/invoiceParsers';
import { xmlFileReader } from '@src/lib/modules/documentParser/documentReader';
import { parseFactura } from '@src/lib/modules/documentParser/invoiceParser';

Page.getLayout = (page: React.ReactElement) => (
  <DashboardLayout>{page}</DashboardLayout>
);

function Page() {
  const [files, setFiles] = useState<(File | string)[]>([]);
  const [parsedData, setParsedData] = useState<ParsedInvoice[]>([]);

  const handleUpload = async () => {
    const documentParsedData = await xmlFileReader<ParsedInvoice>(
      files,
      parseFactura
    );

    setParsedData(documentParsedData);
  };
  const handleReset = () => {
    setFiles([]);
    setParsedData([]);
  };

  return (
    <DashboardTemplate
      documentTitle="Lector de Retenciones"
      heading="Lector de Retenciones"
      action={
        <Stack direction="row" gap={1}>
          <Button
            onClick={handleReset}
            variant="contained"
            disabled={!files.length && !parsedData.length}
          >
            Reset
          </Button>
          <Button
            onClick={handleUpload}
            variant="contained"
            disabled={!files.length}
          >
            Leer Facturas
          </Button>
        </Stack>
      }
    >
      {parsedData.length ? (
        <InvoiceDetailsViewer data={parsedData} />
      ) : (
        <DropdownSection
          files={files}
          setFiles={setFiles}
          handleUpload={handleUpload}
          uploadButtonText="Leer Facturas"
        />
      )}
    </DashboardTemplate>
  );
}

export default Page;
