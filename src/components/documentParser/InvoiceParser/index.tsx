import { Stack } from '@mui/material';
import { FC, useState } from 'react';
import { Invoice } from 'src/@types/invoiceParsers';
import { parseFactura } from 'src/lib/modules/invoiceParser';
import { DropdownSection } from './DropdownSection';
import { InvoiceDetailsViewer } from './InvoiceDetailsViewer';

const invoiceArrayReader = (files: (File | string)[]): Invoice[] => {
  const parsedData: Invoice[] = [];
  files.forEach((file) => {
    const reader = new FileReader();

    reader.onload = (e) => {
      const content = e.target?.result;

      if (content && typeof content === 'string') {
        const factura = parseFactura(content);

        if (factura) {
          parsedData.push(factura);
        }
      }
    };

    reader.readAsText(file as Blob);
  });

  return parsedData;
};

const InvoiceParser: FC = () => {
  const [files, setFiles] = useState<(File | string)[]>([]);
  const [parsedData, setParsedData] = useState<Invoice[]>([]);

  const handleUpload = () => {
    const invoices = invoiceArrayReader(files);

    setParsedData(invoices);
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
