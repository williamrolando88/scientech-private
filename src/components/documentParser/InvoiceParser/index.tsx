import { Stack } from '@mui/material';
import { FC, useState } from 'react';
import { Invoice } from 'src/@types/invoiceParsers';
import { parseFactura } from 'src/lib/modules/invoiceParser';
import { DropdownSection } from './DropdownSection';
import { InvoiceDetailsViewer } from './InvoiceDetailsViewer';

const InvoiceParser: FC = () => {
  const [files, setFiles] = useState<(File | string)[]>([]);
  const [parsedData, setParsedData] = useState<Invoice[]>([]);

  const handleUpload = () => {
    files.forEach((file) => {
      const reader = new FileReader();

      reader.onload = (e) => {
        const content = e.target?.result;

        if (content && typeof content === 'string') {
          const factura = parseFactura(content);

          if (factura) {
            setParsedData((prevData) => [...prevData, factura]);
          }
        }
      };

      reader.readAsText(file as Blob);
    });
  };

  const handleReset = () => {
    setFiles([]);
    setParsedData([]);
  };

  return (
    <Stack>
      {parsedData.length ? (
        <InvoiceDetailsViewer data={parsedData} onReset={handleReset} />
      ) : (
        <DropdownSection files={files} setFiles={setFiles} handleUpload={handleUpload} />
      )}
    </Stack>
  );
};

export default InvoiceParser;
