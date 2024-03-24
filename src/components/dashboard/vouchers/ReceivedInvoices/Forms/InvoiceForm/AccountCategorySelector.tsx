import { MenuItem } from '@mui/material';
import { FormikTextField } from '@src/components/shared/formik-components';
import { useListAccountCategories } from '@src/hooks/cache/accountCategories';
import { useField } from 'formik';
import { FC, useEffect } from 'react';

interface AccountCategorySelectorProps {
  name: string;
  selectableCategories?: string[];
  label?: string;
  size?: 'small' | 'medium';
  initialValue?: string;
}
export const AccountCategorySelector: FC<AccountCategorySelectorProps> = ({
  name,
  initialValue,
  label = '',
  size = 'medium',
  selectableCategories = [],
}) => {
  const { data: accountCategories } = useListAccountCategories();
  const [, , { setValue }] = useField(name);

  const filteredAccountCategories = Object.values(accountCategories)
    .filter(
      (category) =>
        !selectableCategories.every((type) => !category.id.startsWith(type))
    )
    .sort((a, b) => a.id.localeCompare(b.id));

  useEffect(() => {
    if (initialValue) {
      setValue(initialValue);
    }
  }, [initialValue, setValue]);

  return (
    <FormikTextField fullWidth size={size} select name={name} label={label}>
      {filteredAccountCategories.map((category) => (
        <MenuItem key={category.id} value={category.id}>
          {`${category.id} - ${category.name}`}
        </MenuItem>
      ))}
    </FormikTextField>
  );
};
