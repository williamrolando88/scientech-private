import { Dialog, DialogTitle } from '@mui/material';
import { xmlFileReader } from '@src/lib/modules/documentParser/documentReader';
import { parseFactura } from '@src/lib/modules/documentParser/invoiceParser';
import { ParsedInvoice } from '@src/types/documentParsers';
import { FC, useState } from 'react';
import { DropdownSection } from '../../documentParser/DropdownSection';

interface Props {
  open: boolean;
  onClose: VoidFunction;
}

export const IssuedInvoiceReader: FC<Props> = ({ onClose, open }) => {
  const [busy, setBusy] = useState(false);
  const [files, setFiles] = useState<(File | string)[]>([]);
  const [parsedData, setParsedData] = useState<ParsedInvoice[]>([]);

  const handleConfirmation = async () => {
    setBusy(true);
    const documentParsedData = await xmlFileReader<ParsedInvoice>(
      files,
      parseFactura
    );

    setParsedData(documentParsedData);
    setBusy(false);

    console.log(documentParsedData[0]);
  };

  const handleClose = () => {
    if (busy) return;
    onClose();

    setTimeout(() => {
      setFiles([]);
    }, 300);
  };

  return (
    <Dialog maxWidth="sm" fullWidth open={open} onClose={handleClose}>
      <DialogTitle>Cargar facturas emitidas</DialogTitle>

      <DropdownSection
        files={files}
        setFiles={setFiles}
        onUpload={handleConfirmation}
        uploadButtonText="Cargar facturas"
        accept={{ 'text/xml': [] }}
        multiple
        scrollable
      />
    </Dialog>
  );
};
