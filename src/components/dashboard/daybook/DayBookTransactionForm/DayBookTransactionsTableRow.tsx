import { Button, Grid, MenuItem } from '@mui/material';
import { useFormikContext } from 'formik';
import { FC } from 'react';
import {
  FormikAutoCalculateField,
  FormikTextField,
} from 'src/components/shared/formik-components';
import Iconify from 'src/components/shared/iconify';
import { useAccountCategoriesStore } from 'src/lib/stores/accountCategories';
import { DayBookTransaction } from 'src/types/dayBook';

interface DayBookTransactionsTableRowProps {
  index: number;
}
export const DayBookTransactionsTableRow: FC<
  DayBookTransactionsTableRowProps
> = ({ index }) => {
  const { categories } = useAccountCategoriesStore();
  const { values, setValues } = useFormikContext<DayBookTransaction>();

  const handleDeleteRow = (rowIndex: number) => {
    setValues({
      ...values,
      transactions: values.transactions.filter((_, idx) => idx !== rowIndex),
    });
  };
  return (
    <Grid container columns={7}>
      <Grid item xs={1}>
        <FormikTextField
          fullWidth
          select
          name={`transactions[${index}].account_id`}
        >
          {Object.values(categories).map((category) => (
            <MenuItem key={category.id} value={category.id}>
              {`${category.id} - ${category.name}`}
            </MenuItem>
          ))}
        </FormikTextField>
      </Grid>

      <Grid item xs={1}>
        <FormikAutoCalculateField name={`transactions[${index}].debit`} />
      </Grid>
      <Grid item xs={1}>
        <FormikAutoCalculateField name={`transactions[${index}].credit`} />
      </Grid>
      <Grid item xs={1}>
        <FormikTextField name={`transactions[${index}].description`} />
      </Grid>
      <Grid item xs={1}>
        <FormikTextField name={`transactions[${index}].invoice_id`} />
      </Grid>
      <Grid item xs={1}>
        <FormikTextField name={`transactions[${index}].quotation_id`} />
      </Grid>
      <Grid item xs={1}>
        <Button
          variant="outlined"
          color="error"
          onClick={() => handleDeleteRow(index)}
        >
          <Iconify icon="pajamas:remove" />
        </Button>
      </Grid>
    </Grid>
  );
};
