import { Button } from '@mui/material';
import { useState } from 'react';
import { DropdownSection } from 'src/components/dashboard/documentParser/InvoiceParser/DropdownSection';
import { InvoiceDetailsViewer } from 'src/components/dashboard/documentParser/InvoiceParser/InvoiceDetailsViewer';
import DashboardLayout from 'src/components/shared/layouts/dashboard/DashboardLayout';
import DashboardTemplate from 'src/components/shared/layouts/dashboard/DashboardTemplate';
import { ParsedInvoice } from 'src/types/invoiceParsers';
import { parseFactura } from '@src/lib/modules/documentParser/invoiceParser';
import { xmlFileReader } from '@src/lib/modules/documentParser/documentReader';

Page.getLayout = (page: React.ReactElement) => (
  <DashboardLayout>{page}</DashboardLayout>
);

function Page() {
  const [files, setFiles] = useState<(string | File)[]>([]);
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
      documentTitle="Lector de Facturas"
      heading="Lector de Facturas"
      action={
        parsedData.length ? (
          <Button onClick={handleReset} variant="contained">
            Reset
          </Button>
        ) : undefined
      }
    >
      {parsedData.length ? (
        <InvoiceDetailsViewer data={parsedData} />
      ) : (
        <DropdownSection
          files={files}
          setFiles={setFiles}
          handleUpload={handleUpload}
        />
      )}
    </DashboardTemplate>
  );
}

export default Page;
