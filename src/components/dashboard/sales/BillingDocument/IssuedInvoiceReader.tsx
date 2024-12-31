import { Dialog, DialogTitle } from '@mui/material';
import { DEFAULT_ACCOUNT } from '@src/lib/constants/settings';
import { xmlFileReader } from '@src/lib/modules/documentParser/documentReader';
import {
  normalizedInvoice2BillingDocument,
  normalizeInvoice,
  parseFactura,
} from '@src/lib/modules/documentParser/invoiceParser';
import { ParsedInvoice } from '@src/types/documentParsers';
import { BillingDocument } from '@src/types/sale';
import { FC, useState } from 'react';
import { DropdownSection } from '../../documentParser/DropdownSection';

interface Props {
  open: boolean;
  onClose: VoidFunction;
}

export const IssuedInvoiceReader: FC<Props> = ({ onClose, open }) => {
  const [busy, setBusy] = useState(false);
  const [files, setFiles] = useState<(File | string)[]>([]);

  const handleUpload = async () => {
    setBusy(true);
    const documentParsedData = await xmlFileReader<ParsedInvoice>(
      files,
      parseFactura
    );

    const billingDocuments = documentParsedData.map((d) => {
      const normalData = normalizeInvoice(d);

      return {
        ...normalizedInvoice2BillingDocument(normalData),
        saleAccount: DEFAULT_ACCOUNT.INCOME_ROOT,
      } satisfies BillingDocument;
    });

    setBusy(false);
    console.log(billingDocuments);
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
        onUpload={handleUpload}
        uploadButtonText="Cargar facturas"
        accept={{ 'text/xml': [] }}
        multiple
        scrollable
      />
    </Dialog>
  );
};
