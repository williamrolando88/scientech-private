import { Stack } from '@mui/material';
import { FC } from 'react';
import { TableHeaderComponent } from '../../CalculatorItems/CalculatorItemsTable/TableHeaderComponent';

interface Props {
  title: string;
  children: React.ReactNode;
}

const CalculatorLotHeader: FC<Props> = ({ children, title }) => (
    <Stack gap={1} width={400}>
      <TableHeaderComponent expand>{title}</TableHeaderComponent>
      {children}
    </Stack>
  );

export default CalculatorLotHeader;
