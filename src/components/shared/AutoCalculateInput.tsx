import { TextField, TextFieldProps } from '@mui/material';
import { round } from 'lodash';
import { evaluate } from 'mathjs';
import { FC, useEffect, useState } from 'react';

export type AutoCalculateInputProps = Omit<TextFieldProps, 'onChange' | 'type'> & {
  /** Use formik `setFieldValue` function for the best compatibility */
  onChange: (field: string, value: number) => void;
};

/**
 * This component uses mathjs under the hood, this makes it possible to
 * autocalculate basic mathematical operations. The same way an spreadsheet
 * does.
 *
 * Check MUI `TextField` variant "outlined" docs to learn how to customize
 */
export const AutoCalculateInput: FC<AutoCalculateInputProps> = ({
  name,
  value,
  onChange,
  ...props
}) => {
  const [inputValue, setInputValue] = useState((value as number).toString());

  const handleBlur = () => {
    if (!name) return;

    try {
      const calculate = evaluate(inputValue);

      if (typeof calculate === 'number') {
        setInputValue(round(calculate, 2).toString());
        onChange(name, round(calculate, 2));
      } else {
        setInputValue('0');
        onChange(name, 0);
      }
    } catch (error) {
      setInputValue('0');
      onChange(name, 0);
    }
  };

  useEffect(() => {
    if (value === 0) {
      setInputValue('0');
    } else {
      setInputValue((value as number).toString());
    }
  }, [value]);

  return (
    <TextField
      {...props}
      name={name}
      onBlur={handleBlur}
      onChange={(e) => setInputValue(e.target.value)}
      value={inputValue}
    />
  );
};
