import { TextField, TextFieldProps } from '@mui/material';
import { useField } from 'formik';
import { FC } from 'react';

interface FormikTextFieldProps
  extends Omit<TextFieldProps, 'value' | 'error' | 'helperText' | 'onChange'> {
  name: string;
}

export const FormikTextField: FC<FormikTextFieldProps> = (props) => {
  const { name, select } = props;
  const [{ value, onChange }, { touched, error }] = useField(name);

  return (
    <TextField
      {...props}
      onFocus={!select ? (e) => e.target.select() : undefined}
      value={value}
      onChange={onChange}
      error={touched && !!error}
      helperText={touched && error}
    />
  );
};
