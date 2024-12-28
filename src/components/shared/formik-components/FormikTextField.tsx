import { TextField, TextFieldProps } from '@mui/material';
import { useField } from 'formik';
import { FC } from 'react';

interface FormikTextFieldProps
  extends Omit<TextFieldProps, 'value' | 'error' | 'helperText' | 'onChange'> {
  name: string;
  readOnly?: boolean;
}

export const FormikTextField: FC<FormikTextFieldProps> = (props) => {
  const { name, select, readOnly, size } = props;
  const [{ value, onChange }, { touched, error }] = useField(name);

  return (
    <TextField
      {...props}
      size={size || 'small'}
      onFocus={!select ? (e) => e.target.select() : undefined}
      value={value}
      onChange={onChange}
      error={touched && !!error}
      helperText={touched && error}
      inputProps={{
        readOnly,
      }}
    />
  );
};
