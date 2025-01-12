import {
  Alert,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
import { formatTaxDocIdNumber } from '@src/lib/utils/formatInvoiceNumber';
import { Sale } from '@src/types/sale';
import { round } from 'mathjs';
import { FC } from 'react';

interface Props {
  sale: Sale | null;
  open: boolean;
  onClose: VoidFunction;
}

const ShowWithholding: FC<Props> = ({ sale, open, onClose }) => {
  if (!sale || !sale.withholding) return null;

  const {
    withholding: {
      establishment,
      emissionPoint,
      sequentialNumber,
      issueDate,
      IVAWithholding = 0,
      IncomeWithholding = 0,
    },
    billingDocument: { IVA, taxedSubtotal },
  } = sale;

  const docId = formatTaxDocIdNumber({
    emissionPoint,
    establishment,
    sequentialNumber,
  });

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>{`Retención ${docId}`}</DialogTitle>
      <Stack component={DialogContent} gap={2}>
        <Alert severity="info">
          Aquí encontrarás detalles de la retención seleccionada
        </Alert>

        <Grid container columns={6} spacing={2}>
          <Grid item xs={4} />

          <Grid item xs={2}>
            <DatePicker
              format="dd/MMM/yyyy"
              label="Fecha de Emisión"
              value={issueDate}
              slotProps={{
                textField: {
                  fullWidth: true,
                  size: 'small',
                },
              }}
              disabled
            />
          </Grid>

          <Grid item xs={6}>
            <Typography variant="subtitle1">Impuesto a la renta</Typography>
          </Grid>

          <Grid item xs={2}>
            <TextField
              fullWidth
              size="small"
              label="Base imponible"
              value={taxedSubtotal}
              disabled
            />
          </Grid>

          <Grid item xs={1} />

          <Grid item xs={1}>
            <TextField
              fullWidth
              size="small"
              label="%"
              value={round((IncomeWithholding / taxedSubtotal) * 100, 0)}
              disabled
            />
          </Grid>

          <Grid item xs={2}>
            <TextField
              fullWidth
              size="small"
              label="Valor retenido"
              value={IncomeWithholding}
              disabled
            />
          </Grid>

          <Grid item xs={6}>
            <Typography variant="subtitle1">IVA</Typography>
          </Grid>

          <Grid item xs={2}>
            <TextField
              fullWidth
              size="small"
              label="Base imponible"
              value={IVA}
              disabled
            />
          </Grid>

          <Grid item xs={1} />

          <Grid item xs={1}>
            <TextField
              fullWidth
              size="small"
              label="%"
              value={round((IVAWithholding / IVA) * 100, 0)}
              disabled
            />
          </Grid>

          <Grid item xs={2}>
            <TextField
              fullWidth
              size="small"
              label="Valor retenido"
              value={IVAWithholding}
              disabled
            />
          </Grid>
        </Grid>
      </Stack>

      <DialogActions>
        <Button type="button" onClick={onClose}>
          Cerrar
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ShowWithholding;
