import { LoadingButton } from '@mui/lab';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from '@mui/material';
import { FC } from 'react';
import { useImportCalculatorContext } from 'src/hooks/useImportCalculatorContext';

interface SaveConfirmationModalProps {
  open: boolean;
  onClose: () => void;
}
export const SaveConfirmationModal: FC<SaveConfirmationModalProps> = ({ onClose, open }) => {
  const { values, errors, touched, isSubmitting, submitForm, handleChange } =
    useImportCalculatorContext();

  const handleConfirm = () => {
    onClose();
    submitForm();
  };

  return (
    <Dialog fullWidth maxWidth="sm" open={open} onClose={onClose}>
      <DialogTitle>Guardar cálculo</DialogTitle>

      <DialogContent dividers sx={{ border: 'none', pt: 1 }}>
        <TextField
          fullWidth
          label="Descripción"
          value={values.metadata.description}
          name="metadata.description"
          onChange={handleChange}
          variant="outlined"
          error={Boolean(errors.metadata?.description && touched.metadata?.description)}
          helperText={touched.metadata?.description && errors.metadata?.description}
          required
        />
      </DialogContent>

      <DialogActions>
        <Button color="error" disabled={isSubmitting} onClick={onClose}>
          Cancelar
        </Button>
        <LoadingButton onClick={handleConfirm} loading={isSubmitting} variant="contained">
          Guardar
        </LoadingButton>
      </DialogActions>
    </Dialog>
  );
};
