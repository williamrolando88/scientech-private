import { Stack } from '@mui/material';
import React, { CSSProperties, FC } from 'react';

interface Props {
  children: React.ReactNode;
  width?: CSSProperties['width'];
  expand?: boolean;
}
export const TableHeaderComponent: FC<Props> = ({ children, width = '4rem', expand }) => (
  <Stack
    fontWeight="700"
    width={!expand ? width : undefined}
    flexGrow={expand ? 1 : undefined}
    bgcolor="secondary.main"
    color="#fff"
    borderRadius={1}
    justifyContent="center"
    alignItems="center"
  >
    {children}
  </Stack>
);
