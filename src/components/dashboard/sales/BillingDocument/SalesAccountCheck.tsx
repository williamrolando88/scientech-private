import { useTheme } from '@mui/material';
import Iconify from '@src/components/shared/iconify';
import { DEFAULT_ACCOUNT } from '@src/lib/constants/settings';
import { Sale } from '@src/types/sale';
import { FC } from 'react';

interface Props {
  row: Sale;
}

const SalesAccountCheck: FC<Props> = ({ row }) => {
  const theme = useTheme();
  const isError =
    row.billingDocument.saleAccount === DEFAULT_ACCOUNT.INCOME_ROOT &&
    (row.paymentCollection || row.withholding);

  const isWarning =
    row.billingDocument.saleAccount === DEFAULT_ACCOUNT.INCOME_ROOT;

  const icon =
    isError || isWarning
      ? 'pajamas:issue-type-feature-flag'
      : 'pajamas:check-xs';

  const getColor = () => {
    if (isError) return theme.palette.error.main;
    if (isWarning) return theme.palette.warning.main;

    return theme.palette.success.main;
  };

  return <Iconify icon={icon} sx={{ color: getColor() }} />;
};

export default SalesAccountCheck;
