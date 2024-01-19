import { useFormikContext } from 'formik';
import { get } from 'lodash';
import { FC } from 'react';
import {
  AutoCalculateInput,
  AutoCalculateInputProps,
} from '../AutoCalculateInput';

interface FormikAutoCalculateFieldProps
  extends Omit<AutoCalculateInputProps, 'value' | 'error' | 'helperText'> {
  name: string;
}

export const FormikAutoCalculateField: FC<FormikAutoCalculateFieldProps> = (
  props
) => {
  const { name } = props;
  const { values, errors, touched, setFieldValue } = useFormikContext();

  const fieldValue = get(values, name, '');
  const fieldError = get(errors, name, '');
  const fieldTouched = get(touched, name, false);

  const handleChange = (inputName: string, inputValue: number) => {
    setFieldValue(inputName, inputValue);
  };

  return (
    <AutoCalculateInput
      {...props}
      onFocus={(e) => e.target.select()}
      value={fieldValue}
      onChange={handleChange}
      error={fieldTouched && !!fieldError}
      helperText={fieldTouched && fieldError}
    />
  );
};
