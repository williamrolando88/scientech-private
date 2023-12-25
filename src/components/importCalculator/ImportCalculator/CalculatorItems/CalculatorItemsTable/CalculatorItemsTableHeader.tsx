import { Button, Stack } from '@mui/material';
import { FC } from 'react';
import Iconify from 'src/components/shared/iconify';
import { useImportCalculatorContext } from 'src/hooks/useImportCalculatorContext';
import { TableHeaderComponent } from './TableHeaderComponent';

const CalculatorItemsTableHeader: FC = () => {
  const { addRow } = useImportCalculatorContext();

  return (
    <Stack direction="row" gap={1} alignItems="stretch">
      <TableHeaderComponent>Cant</TableHeaderComponent>
      <TableHeaderComponent expand>Descripción</TableHeaderComponent>
      <TableHeaderComponent width="8rem">Peso u.</TableHeaderComponent>
      <TableHeaderComponent width="8rem">Costo u.</TableHeaderComponent>
      <TableHeaderComponent width="8rem">Arancel</TableHeaderComponent>
      <TableHeaderComponent width="8rem">Margen</TableHeaderComponent>
      <TableHeaderComponent width="8rem">Precio u.</TableHeaderComponent>
      <Button sx={{ width: '4rem' }} color="success" variant="outlined" onClick={addRow}>
        <Iconify icon="pajamas:plus" />
      </Button>
    </Stack>
  );
};

export default CalculatorItemsTableHeader;
