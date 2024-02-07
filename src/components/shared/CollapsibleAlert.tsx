import {
  Alert,
  AlertProps,
  AlertTitle,
  Collapse,
  IconButton,
} from '@mui/material';
import { FC } from 'react';
import Iconify from './iconify';

interface Props extends Pick<AlertProps, 'severity' | 'title' | 'children'> {
  onClose: VoidFunction;
  open: boolean;
}
const CollapsibleAlert: FC<Props> = ({
  children,
  onClose,
  open,
  severity,
  title,
}) => (
  <Collapse sx={{ mt: 2 }} in={open}>
    <Alert
      severity={severity}
      action={
        <IconButton onClick={onClose}>
          <Iconify icon="pajamas:close" />
        </IconButton>
      }
    >
      {title && <AlertTitle>{title}</AlertTitle>}
      {children}
    </Alert>
  </Collapse>
);

export default CollapsibleAlert;
