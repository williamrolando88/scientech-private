import { Button, Stack } from '@mui/material';
import { DropdownSection } from '@src/components/dashboard/documentParser/DropdownSection';
import { HoldingDetailsViewer } from '@src/components/dashboard/documentParser/HoldingDetailsViewer';
import { xmlFileReader } from '@src/lib/modules/documentParser/documentReader';
import { parseWithholdingXML } from '@src/lib/modules/documentParser/holdingParser';
import { ParsedWithholding } from '@src/types/documentParsers';
import { useState } from 'react';
import DashboardLayout from 'src/components/shared/layouts/dashboard/DashboardLayout';
import DashboardTemplate from 'src/components/shared/layouts/dashboard/DashboardTemplate';

Page.getLayout = (page: React.ReactElement) => (
  <DashboardLayout>{page}</DashboardLayout>
);

function Page() {
  const [files, setFiles] = useState<(File | string)[]>([]);
  const [parsedData, setParsedData] = useState<ParsedWithholding[]>([]);

  const handleUpload = async () => {
    const documentParsedData = await xmlFileReader<ParsedWithholding>(
      files,
      parseWithholdingXML
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
            Leer Retenciones
          </Button>
        </Stack>
      }
    >
      {parsedData.length ? (
        <HoldingDetailsViewer data={parsedData} />
      ) : (
        <DropdownSection
          files={files}
          setFiles={setFiles}
          onUpload={handleUpload}
          uploadButtonText="Leer Retenciones"
          accept={{ 'text/xml': [] }}
          multiple
        />
      )}
    </DashboardTemplate>
  );
}

export default Page;
