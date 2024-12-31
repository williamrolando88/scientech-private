import { Dialog, DialogTitle } from '@mui/material';
import { DEFAULT_ACCOUNT } from '@src/lib/constants/settings';
import { xmlFileReader } from '@src/lib/modules/documentParser/documentReader';
import {
  normalizedInvoice2BillingDocument,
  normalizeInvoice,
  parseFactura,
} from '@src/lib/modules/documentParser/invoiceParser';
import { SalesFirestore } from '@src/services/firestore/sales';
import { ParsedInvoice } from '@src/types/documentParsers';
import { BillingDocument } from '@src/types/sale';
import { useSnackbar } from 'notistack';
import { FC, useState } from 'react';
import { DropdownSection } from '../../documentParser/DropdownSection';

interface Props {
  open: boolean;
  onClose: VoidFunction;
}

export const IssuedInvoiceReader: FC<Props> = ({ onClose, open }) => {
  const { enqueueSnackbar } = useSnackbar();
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

    SalesFirestore.bulkCreate(billingDocuments)
      .then(({ created, existing }) => {
        if (created) {
          enqueueSnackbar(`Se crearon ${created} facturas`);
        }

        if (existing) {
          enqueueSnackbar(`No se crearon ${existing} facturas existentes`, {
            variant: 'info',
          });
        }

        handleClose({ force: true });
      })
      .catch((e) => {
        enqueueSnackbar(`Algo salió mal, vuelva a intentarlo nuevamente`, {
          variant: 'error',
        });
        console.error(e);
      })
      .finally(() => {
        setBusy(false);
      });
  };

  const handleClose = ({ force = false } = {}) => {
    if (busy && !force) return;
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
