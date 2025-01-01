import { Dialog, DialogTitle } from '@mui/material';
import { xmlFileReader } from '@src/lib/modules/documentParser/documentReader';
import {
  normalizeWithholding2Withholding,
  parseWithholdingXML,
} from '@src/lib/modules/documentParser/holdingParser';
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

    const withholdingDocuments = documentParsedData
      .filter((d) => !!d)
      .map((d) =>
        normalizeWithholding2Withholding(d as NormalizedParsedWithholding)
      );

    SalesFirestore.bulkWithhold(withholdingDocuments)
      .then(({ created, existing }) => {
        if (created) {
          enqueueSnackbar(`Se crearon ${created} retenciones`);
        }

        if (existing) {
          enqueueSnackbar(`No se crearon ${existing} retenciones existentes`, {
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
