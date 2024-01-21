import { DatePicker, DatePickerProps } from '@mui/x-date-pickers';
import { useFormikContext } from 'formik';
import { get } from 'lodash';
import { FC } from 'react';

interface FormikDatePickerProps
  extends Omit<DatePickerProps<any>, 'value' | 'onChange' | 'renderInput'> {
  name: string;
}
export const FormikDatePicker: FC<FormikDatePickerProps> = (props) => {
  const { name } = props;
  const { values, touched, errors, setFieldValue } = useFormikContext();

  const fieldValue = get(values, name, '');
  const fieldTouched = get(touched, name, false);
  const fieldError = get(errors, name, '');

  const handleChange = (value: string | null) => {
    if (value) {
      setFieldValue(name, new Date(value));
    }
  };

  return (
    <DatePicker
      {...props}
      value={fieldValue}
      onChange={handleChange}
      slotProps={{
        textField: {
          helperText: fieldTouched && fieldError,
          error: fieldTouched && !!fieldError,
        },
      }}
    />
  );
};
