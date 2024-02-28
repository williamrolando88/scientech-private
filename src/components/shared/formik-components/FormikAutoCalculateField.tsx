import { useField } from 'formik';
import { FC } from 'react';
import {
  AutoCalculateInput,
  AutoCalculateInputProps,
} from '../AutoCalculateInput';

interface FormikAutoCalculateFieldProps
  extends Omit<
    AutoCalculateInputProps,
    'value' | 'error' | 'helperText' | 'onChange'
  > {
  name: string;
}

export const FormikAutoCalculateField: FC<FormikAutoCalculateFieldProps> = (
  props
) => {
  const { name } = props;
  const [{ value }, { touched, error }, { setValue }] = useField(name);

  const handleChange = (_: string, inputValue: number) => {
    setValue(inputValue);
  };

  return (
    <AutoCalculateInput
      {...props}
      onFocus={(e) => e.target.select()}
      value={value}
      onChange={handleChange}
      error={touched && !!error}
      helperText={touched && error}
    />
  );
};
