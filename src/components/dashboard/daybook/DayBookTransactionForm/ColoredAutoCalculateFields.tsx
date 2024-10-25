import { useTheme } from '@mui/material';
import { useFormikContext } from 'formik';
import { FC } from 'react';
import { FormikAutoCalculateField } from 'src/components/shared/formik-components';
import { DayBookTransactionOld } from 'src/types/dayBook';

interface ColoredAutoCalculateFieldsProps {
  index: number;
  type: 'debit' | 'credit';
}
export const ColoredAutoCalculateFields: FC<
  ColoredAutoCalculateFieldsProps
> = ({ index, type }) => {
  const positiveDebit = ['1', '5'];
  const positiveCredit = ['2', '3', '4'];

  const theme = useTheme();
  const { values } = useFormikContext<DayBookTransactionOld>();

  const accountValue = values.transactions[index].account_id[0];

  const getFieldBgColor = () => {
    if (!accountValue) return 'transparent';

    if (type === 'debit') {
      return positiveDebit.includes(accountValue)
        ? theme.palette.success.lighter
        : theme.palette.error.lighter;
    }

    return positiveCredit.includes(accountValue)
      ? theme.palette.success.lighter
      : theme.palette.error.lighter;
  };

  return (
    <FormikAutoCalculateField
      sx={{
        '& .MuiInputBase-input': {
          bgcolor: getFieldBgColor(),
          borderRadius: 'inherit',
        },
      }}
      fullWidth
      size="small"
      name={`transactions[${index}].${type}`}
    />
  );
};
