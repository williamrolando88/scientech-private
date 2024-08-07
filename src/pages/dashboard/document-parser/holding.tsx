import { Button, Stack } from '@mui/material';
import { useState } from 'react';
import { DropdownSection } from '@src/components/dashboard/documentParser/DropdownSection';
import DashboardLayout from 'src/components/shared/layouts/dashboard/DashboardLayout';
import DashboardTemplate from 'src/components/shared/layouts/dashboard/DashboardTemplate';
import { xmlFileReader } from '@src/lib/modules/documentParser/documentReader';
import { parseRetencion } from '@src/lib/modules/documentParser/holdingParser';
import { ParsedHolding } from '@src/types/documentParsers';
import { HoldingDetailsViewer } from '@src/components/dashboard/documentParser/HoldingDetailsViewer';

Page.getLayout = (page: React.ReactElement) => (
  <DashboardLayout>{page}</DashboardLayout>
);

function Page() {
  const buttonText = 'Leer Retenciones';
  const [files, setFiles] = useState<(File | string)[]>([]);
  const [parsedData, setParsedData] = useState<ParsedHolding[]>([]);

  const handleUpload = async () => {
    const documentParsedData = await xmlFileReader<ParsedHolding>(
      files,
      parseRetencion
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
            {buttonText}
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
          handleUpload={handleUpload}
          uploadButtonText={buttonText}
        />
      )}
    </DashboardTemplate>
  );
}

export default Page;
