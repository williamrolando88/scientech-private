import { TextField, TextFieldProps } from '@mui/material';
import { useFormikContext } from 'formik';
import { get } from 'lodash';
import { FC } from 'react';

interface FormikTextFieldProps
  extends Omit<TextFieldProps, 'value' | 'error' | 'helperText' | 'onChange'> {
  name: string;
}

export const FormikTextField: FC<FormikTextFieldProps> = (props) => {
  const { name, select } = props;
  const { values, errors, touched, handleChange } = useFormikContext();

  const fieldValue = get(values, name, '');
  const fieldError = get(errors, name, '');
  const fieldTouched = get(touched, name, false);

  return (
    <TextField
      {...props}
      onFocus={!select ? (e) => e.target.select() : undefined}
      value={fieldValue}
      onChange={handleChange}
      error={fieldTouched && !!fieldError}
      helperText={fieldTouched && fieldError}
    />
  );
};
