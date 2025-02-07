import { MenuItem } from '@mui/material';
import { FormikTextField } from '@src/components/shared/formik-components';
import { useListAccountCategories } from '@src/hooks/cache/accountCategories';
import { useField } from 'formik';
import { FC } from 'react';
import { useEffectOnce } from 'usehooks-ts';

interface AccountCategorySelectorProps {
  name: string;
  selectableCategories: string[];
  initialValue?: string;
  label?: string;
  size?: 'small' | 'medium';
  required?: boolean;
  disabled?: boolean;
  excludeCategories?: boolean;
}

export const AccountCategorySelector: FC<AccountCategorySelectorProps> = ({
  name,
  initialValue,
  selectableCategories,
  label = '',
  size = 'medium',
  required = false,
  disabled = false,
  excludeCategories = false,
}) => {
  const { data: accountCategories } = useListAccountCategories();
  const [{ value }, , { setValue }] = useField(name);

  const filteredAccountCategories = Object.values(accountCategories)
    .filter(
      (category) =>
        !selectableCategories.every((type) => !category.id.startsWith(type))
    )
    .filter((category) =>
      excludeCategories
        ? selectableCategories.every((root) => root !== category.id)
        : true
    )
    .sort((a, b) => a.id.localeCompare(b.id));

  useEffectOnce(() => {
    if (value) {
      setValue(value, false);
    } else {
      setValue(initialValue, false);
    }
  });

  return (
    <FormikTextField
      select
      fullWidth
      size={size}
      name={name}
      label={label}
      required={required}
      disabled={disabled}
    >
      {filteredAccountCategories.map((category) => (
        <MenuItem key={category.id} value={category.id}>
          {`${category.id} - ${category.name}`}
        </MenuItem>
      ))}
    </FormikTextField>
  );
};
