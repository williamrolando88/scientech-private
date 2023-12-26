import { Button } from '@mui/material';
import { useRouter } from 'next/router';
import { FC, useState } from 'react';
import SplitButton from 'src/components/shared/SplitButton';
import ConfirmDialog from 'src/components/shared/confirm-dialog';
import { useImportCalculatorContext } from 'src/hooks/useImportCalculatorContext';
import { PATH_DASHBOARD } from 'src/routes/paths';
import { SaveConfirmationModal } from './SaveConfirmationModal';

const CalculatorControllers: FC = () => {
  const { resetForm, values } = useImportCalculatorContext();
  const { push } = useRouter();
  const [saveModalOpen, setSaveModalOpen] = useState(false);
  const [resetModalOpen, setResetModalOpen] = useState(false);

  const handleResetConfirmation = () => {
    setResetModalOpen(false);
    resetForm();

    if (values.id) {
      push(PATH_DASHBOARD.calculator.new);
    }
  };

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
            label: values.id ? 'Nuevo' : 'Reiniciar',
            onClick: () => setResetModalOpen(true),
            icon: values.id ? 'eva:file-outline' : 'eva:refresh-fill',
          },
        ]}
      />

      <SaveConfirmationModal open={saveModalOpen} onClose={() => setSaveModalOpen(false)} />

      <ConfirmDialog
        maxWidth="sm"
        open={resetModalOpen}
        onClose={() => setResetModalOpen(false)}
        action={
          <Button variant="contained" onClick={handleResetConfirmation}>
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
