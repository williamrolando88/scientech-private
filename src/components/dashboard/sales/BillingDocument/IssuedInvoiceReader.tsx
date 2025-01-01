import { Dialog, DialogTitle } from '@mui/material';
import { USER_RUC } from '@src/lib/constants/settings';
import { xmlFileReader } from '@src/lib/modules/documentParser/documentReader';
import {
  normalizedInvoice2BillingDocument,
  parseInvoiceXML,
} from '@src/lib/modules/documentParser/invoiceParser';
import { SalesFirestore } from '@src/services/firestore/sales';
import { NormalizedParsedInvoice } from '@src/types/documentParsers';
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
    const documentParsedData = await xmlFileReader(files, parseInvoiceXML);

    const billingDocuments = documentParsedData
      .filter((d) => !!d)
      .filter((d) => d?.infoTributaria.ruc === USER_RUC)
      .map((d) =>
        normalizedInvoice2BillingDocument(d as NormalizedParsedInvoice)
      );

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
