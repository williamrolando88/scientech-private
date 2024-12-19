import { Button, Dialog, DialogActions, DialogContent } from '@mui/material';
import { FC } from 'react';

interface Props {
  open: boolean;
  onClose: VoidFunction;
  amount: number;
}

const PaymentModal: FC<Props> = ({ onClose, open, amount }) => {
  console.log('mounting');

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogContent>
        {`This is the payment modal for $${amount} USD`}
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>Cancelar</Button>
      </DialogActions>
    </Dialog>
  );
};

export default PaymentModal;
