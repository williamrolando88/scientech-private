import { Dialog, DialogTitle } from '@mui/material';
import { xmlFileReader } from '@src/lib/modules/documentParser/documentReader';
import { parseWithholdingXML } from '@src/lib/modules/documentParser/holdingParser';
import { ParsedWithholding } from '@src/types/documentParsers';
import { useSnackbar } from 'notistack';
import { FC, useState } from 'react';
import { DropdownSection } from '../../documentParser/DropdownSection';

interface Props {
  open: boolean;
  onClose: VoidFunction;
}

const WithholdingReader: FC<Props> = ({ open, onClose }) => {
  const { enqueueSnackbar } = useSnackbar();
  const [busy, setBusy] = useState(false);
  const [files, setFiles] = useState<(File | string)[]>([]);

  const handleUpload = async () => {
    setBusy(true);
    const documentParsedData = await xmlFileReader<ParsedWithholding>(
      files,
      parseWithholdingXML
    );

    // const billingDocuments = documentParsedData.map((d) => {
    //   const normalData = normalizeInvoice(d);

    //   return {
    //     ...normalizedInvoice2BillingDocument(normalData),
    //     saleAccount: DEFAULT_ACCOUNT.INCOME_ROOT,
    //   } satisfies BillingDocument;
    // });

    // SalesFirestore.bulkCreate(billingDocuments)
    //   .then(({ created, existing }) => {
    //     if (created) {
    //       enqueueSnackbar(`Se crearon ${created} facturas`);
    //     }

    //     if (existing) {
    //       enqueueSnackbar(`No se crearon ${existing} facturas existentes`, {
    //         variant: 'info',
    //       });
    //     }

    //     handleClose({ force: true });
    //   })
    //   .catch((e) => {
    //     enqueueSnackbar(`Algo salió mal, vuelva a intentarlo nuevamente`, {
    //       variant: 'error',
    //     });
    //     console.error(e);
    //   })
    //   .finally(() => {
    //     setBusy(false);
    //   });
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
      <DialogTitle>Cargar retenciones recibidas</DialogTitle>

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

export default WithholdingReader;
