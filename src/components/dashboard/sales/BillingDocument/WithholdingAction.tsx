import { IconButton } from '@mui/material';
import Iconify from '@src/components/shared/iconify';
import { Sale } from '@src/types/sale';
import { FC } from 'react';
import AddWithholding from '../Withholding/AddWithholding';

interface Props {
  row: Sale;
  onWithholdingClick: (sale: Sale) => void;
}

const WithholdingAction: FC<Props> = ({ row, onWithholdingClick }) => {
  if (row.withholding) {
    const hasErrors =
      Number.isNaN(row.withholding.IVAWithholding) ||
      Number.isNaN(row.withholding.IncomeWithholding);

    return (
      <IconButton onClick={() => onWithholdingClick(row)}>
        <Iconify
          icon={
            hasErrors ? 'pajamas:review-warning' : 'pajamas:review-checkmark'
          }
          sx={{
            color: (theme) =>
              Number.isNaN(row.paymentDue)
                ? theme.palette.error.main
                : theme.palette.success.main,
          }}
        />
      </IconButton>
    );
  }

  if (row.paymentCollection && !row.withholding) {
    return (
      <Iconify
        icon="pajamas:review-list"
        sx={{ color: (theme) => theme.palette.grey[400] }}
      />
    );
  }

  return <AddWithholding sale={row} />;
};

export default WithholdingAction;
