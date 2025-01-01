import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@mui/material';
import { ConfirmDialogProps } from './types';

export default function ConfirmDialog({
  title,
  content = 'Estas seguro que deseas continuar?',
  action,
  open,
  onClose,
  ...other
}: ConfirmDialogProps) {
  return (
    <Dialog fullWidth maxWidth="xs" open={open} onClose={onClose} {...other}>
      <DialogTitle sx={{ pb: 2 }}>{title}</DialogTitle>

      {content && (
        <DialogContent sx={{ typography: 'body2' }}> {content} </DialogContent>
      )}

      <DialogActions>
        <Button onClick={onClose}>Cancelar</Button>

        {action}
      </DialogActions>
    </Dialog>
  );
}
