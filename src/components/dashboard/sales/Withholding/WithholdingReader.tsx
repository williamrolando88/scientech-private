import { Dialog, DialogTitle } from '@mui/material';
import { xmlFileReader } from '@src/lib/modules/documentParser/documentReader';
import { parseWithholdingXML } from '@src/lib/modules/documentParser/holdingParser';
import { SalesFirestore } from '@src/services/firestore/sales';
import { NormalizedParsedWithholding } from '@src/types/documentParsers';
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
    const documentParsedData = await xmlFileReader(files, parseWithholdingXML);

    const withholdingDocuments = documentParsedData.filter((d) => !!d);

    SalesFirestore.bulkWithhold(
      withholdingDocuments as NormalizedParsedWithholding[]
    )
      .then(({ linked, ignored }) => {
        if (linked) {
          enqueueSnackbar(
            `Se vincularon ${linked} retenciones a facturas existentes`
          );
        }

        if (ignored) {
          enqueueSnackbar(
            `No se vincularon ${ignored} retenciones a ninguna factura existente`,
            {
              variant: 'info',
            }
          );
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
