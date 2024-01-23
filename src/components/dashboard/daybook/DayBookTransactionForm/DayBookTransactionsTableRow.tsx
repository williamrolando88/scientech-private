import { Button, Grid, MenuItem } from '@mui/material';
import { useFormikContext } from 'formik';
import { FC, useMemo } from 'react';
import {
  FormikAutoCalculateField,
  FormikTextField,
} from 'src/components/shared/formik-components';
import Iconify from 'src/components/shared/iconify';
import { useAccountCategories } from 'src/hooks/cache/useAccountCategories';
import { DAYBOOK_FORM_GRID_LAYOUT } from 'src/lib/constants/dayBook';
import { DayBookTransaction } from 'src/types/dayBook';

interface DayBookTransactionsTableRowProps {
  index: number;
}
export const DayBookTransactionsTableRow: FC<
  DayBookTransactionsTableRowProps
> = ({ index }) => {
  const [categories] = useAccountCategories();

  const { values, setValues } = useFormikContext<DayBookTransaction>();

  const handleDeleteRow = (rowIndex: number) => {
    setValues({
      ...values,
      transactions: values.transactions.filter((_, idx) => idx !== rowIndex),
    });
  };

  const accountCategories = Object.values(categories).sort((a, b) =>
    a.id.localeCompare(b.id)
  );

  const InputFieldsArray = [
    <FormikTextField
      fullWidth
      size="small"
      select
      name={`transactions[${index}].account_id`}
    >
      {accountCategories.map((category) => (
        <MenuItem key={category.id} value={category.id}>
          {`${category.id} - ${category.name}`}
        </MenuItem>
      ))}
    </FormikTextField>,
    <FormikAutoCalculateField
      fullWidth
      size="small"
      name={`transactions[${index}].debit`}
    />,
    <FormikAutoCalculateField
      fullWidth
      size="small"
      name={`transactions[${index}].credit`}
    />,
    <FormikTextField
      fullWidth
      size="small"
      name={`transactions[${index}].description`}
    />,
    <FormikTextField
      fullWidth
      size="small"
      name={`transactions[${index}].invoice_id`}
      type="number"
    />,
    <FormikTextField
      fullWidth
      size="small"
      name={`transactions[${index}].quotation_id`}
      type="number"
    />,
    <Button
      sx={{ height: '100%', width: '100%' }}
      variant="outlined"
      color="error"
      onClick={() => handleDeleteRow(index)}
    >
      <Iconify icon="pajamas:remove" />
    </Button>,
  ];

  const totalColumns = useMemo(
    () => DAYBOOK_FORM_GRID_LAYOUT.reduce((acc, curr) => acc + curr.value, 0),
    []
  );

  return (
    <Grid container columns={totalColumns} columnSpacing={1} mt={1}>
      {DAYBOOK_FORM_GRID_LAYOUT.map((item, idx) => (
        <Grid item xs={item.value} key={idx}>
          {InputFieldsArray[idx]}
        </Grid>
      ))}
    </Grid>
  );
};
