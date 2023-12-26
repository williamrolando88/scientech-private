import { Button } from '@mui/material';
import { FC, useState } from 'react';
import SplitButton from 'src/components/shared/SplitButton';
import ConfirmDialog from 'src/components/shared/confirm-dialog';
import { useImportCalculatorContext } from 'src/hooks/useImportCalculatorContext';
import { SaveConfirmationModal } from './SaveConfirmationModal';

const CalculatorControllers: FC = () => {
  const { resetForm } = useImportCalculatorContext();
  const [saveModalOpen, setSaveModalOpen] = useState(false);
  const [resetModalOpen, setResetModalOpen] = useState(false);

  return (
    <>
      <SplitButton
        action={{
          label: 'Guardar',
          onClick: () => setSaveModalOpen(true),
          icon: 'eva:save-fill',
        }}
        options={[
          {
            label: 'Reiniciar',
            onClick: () => setResetModalOpen(true),
            icon: 'eva:refresh-fill',
          },
        ]}
      />

      <SaveConfirmationModal open={saveModalOpen} onClose={() => setSaveModalOpen(false)} />

      <ConfirmDialog
        maxWidth="sm"
        open={resetModalOpen}
        onClose={() => setResetModalOpen(false)}
        action={
          <Button variant="contained" onClick={resetForm}>
            Reiniciar
          </Button>
        }
        title="Reiniciar calculadora"
        content="Estas a punto de reiniciar la calculadora, esta acción es irreversible. ¿Deseas continuar?"
      />
    </>
  );
};

export default CalculatorControllers;
