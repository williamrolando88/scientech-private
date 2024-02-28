import { DatePicker, DatePickerProps } from '@mui/x-date-pickers';
import { useField } from 'formik';
import { FC } from 'react';

interface FormikDatePickerProps
  extends Omit<DatePickerProps<any>, 'value' | 'onChange' | 'renderInput'> {
  name: string;
}
export const FormikDatePicker: FC<FormikDatePickerProps> = (props) => {
  const { name } = props;
  const [{ value }, { touched, error }, { setValue }] = useField(name);

  const handleChange = (newValue: string | null) => {
    if (newValue) {
      setValue(new Date(newValue));
    }
  };

  return (
    <DatePicker
      {...props}
      value={value}
      onChange={handleChange}
      slotProps={{
        textField: {
          helperText: touched && error,
          error: touched && !!error,
        },
      }}
    />
  );
};
