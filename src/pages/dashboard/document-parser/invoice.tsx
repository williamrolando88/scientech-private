import { Button, Stack } from '@mui/material';
import { DropdownSection } from '@src/components/dashboard/documentParser/DropdownSection';
import { InvoiceDetailsViewer } from '@src/components/dashboard/documentParser/InvoiceDetailsViewer';
import { USER_RUC } from '@src/lib/constants/settings';
import { xmlFileReader } from '@src/lib/modules/documentParser/documentReader';
import { parseInvoiceXML } from '@src/lib/modules/documentParser/invoiceParser';
import { NormalizedParsedInvoice } from '@src/types/documentParsers';
import { useState } from 'react';
import DashboardLayout from 'src/components/shared/layouts/dashboard/DashboardLayout';
import DashboardTemplate from 'src/components/shared/layouts/dashboard/DashboardTemplate';

Page.getLayout = (page: React.ReactElement) => (
  <DashboardLayout>{page}</DashboardLayout>
);

function Page() {
  const buttonText = 'Leer Facturas';
  const [files, setFiles] = useState<(string | File)[]>([]);
  const [parsedData, setParsedData] = useState<
    (NormalizedParsedInvoice | null)[]
  >([]);

  const handleUpload = async () => {
    const documentParsedData = await xmlFileReader(files, parseInvoiceXML);

    const filteredDocuments = documentParsedData.filter(
      (d) => d?.infoTributaria.ruc !== USER_RUC
    );

    setParsedData(filteredDocuments);
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
            {buttonText}
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
          onUpload={handleUpload}
          uploadButtonText={buttonText}
          accept={{ 'text/xml': [] }}
          multiple
        />
      )}
    </DashboardTemplate>
  );
}

export default Page;
