import { Stack } from '@mui/material';
import { FC } from 'react';
import { useImportCalculatorContext } from 'src/hooks/useImportCalculatorContext';
import CalculatorItemsRow from './CalculatorItemsRow';
import CalculatorItemsTableHeader from './CalculatorItemsTableHeader';

const CalculatorItemsTable: FC = () => {
  const { values, deleteRow } = useImportCalculatorContext();

  return (
    <Stack gap={1}>
      <CalculatorItemsTableHeader />

      <Stack gap={1}>
        {values.items.map((_, index) => (
          <CalculatorItemsRow key={index} onDelete={() => deleteRow(index)} index={index} />
        ))}
      </Stack>
    </Stack>
  );
};

export default CalculatorItemsTable;
