import { Sale } from '@src/types/sale';
import { FC } from 'react';
import ShowWithholding from './ShowWithholding';
import UpsertWithholding from './UpsertWithholding';

interface Props {
  sale: Sale | null;
  open: boolean;
  onClose: VoidFunction;
}

const OpenWithholding: FC<Props> = (props) => {
  const { sale } = props;

  if (!sale?.withholding?.unlocked) {
    return <ShowWithholding {...props} />;
  }
  return <UpsertWithholding {...props} />;
};

export default OpenWithholding;
