import { useContext } from 'react';
import { CalculatorContext } from '../components/importCalculator/ImportCalculator/ImportCalculatorProvider';

export const useImportCalculatorContext = () => useContext(CalculatorContext);
