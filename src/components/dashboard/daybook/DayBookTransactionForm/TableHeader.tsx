import { Box, Typography } from '@mui/material';
import { FC } from 'react';

interface TableHeaderProps {
  children: React.ReactNode;
}
export const TableHeader: FC<TableHeaderProps> = ({ children }) => (
  <Box
    borderRadius={1}
    bgcolor="primary.main"
    justifyContent="center"
    alignItems="center"
    display="flex"
    width={1}
    height={1}
    textAlign="center"
    color="white"
  >
    <Typography fontWeight={700}>{children}</Typography>
  </Box>
);
