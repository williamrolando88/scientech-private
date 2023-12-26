import { FC, useState } from 'react';
import SplitButton from 'src/components/shared/SplitButton';
import { useImportCalculatorContext } from 'src/hooks/useImportCalculatorContext';

const CalculatorControllers: FC = () => {
  const { resetForm, values } = useImportCalculatorContext();
  const [saveModalOpen, setSaveModalOpen] = useState(false);

  return (
    <SplitButton
      action={{
        label: 'Guardar',
        onClick: () => setSaveModalOpen(true),
        icon: 'eva:save-fill',
      }}
      options={[
        {
          label: 'Reiniciar',
          onClick: resetForm,
          icon: 'eva:refresh-fill',
        },
      ]}
    />
  );
};

export default CalculatorControllers;
