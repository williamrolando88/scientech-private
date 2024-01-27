import { useContext } from 'react';
import { CalculatorContext } from 'src/components/dashboard/importCalculator/ImportCalculator/ImportCalculatorProvider';

export const useImportCalculatorContext = () => useContext(CalculatorContext);
