import { FormikErrors, FormikHelpers, FormikTouched, useFormik } from 'formik';
import { useRouter } from 'next/router';
import {
  FC,
  ReactNode,
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import {
  IMPORT_CALCULATOR_INITIAL_VALUE,
  IMPORT_CALCULATOR_NEW_ROW,
} from 'src/lib/constants/importCalculator';
import {
  calculateImportation,
  getImportReport,
} from 'src/lib/modules/importCalculator';
import { ImportCalculatorValidationSchema } from 'src/lib/parsers/importCalculator';
import { PATH_DASHBOARD } from 'src/routes/paths';
import ImportCalculationsFirebase from 'src/services/firebase/importCalculations';
import { ImportCalculator } from 'src/types/importCalculator';
import { toFormikValidationSchema } from 'zod-formik-adapter';

interface Context {
  values: ImportCalculator;
  errors: FormikErrors<ImportCalculator>;
  touched: FormikTouched<ImportCalculator>;
  handleChange: (e: React.ChangeEvent<unknown>) => void;
  resetForm: VoidFunction;
  addRow: VoidFunction;
  deleteRow: (id: number) => void;
  addNote: (body: string) => void;
  deleteNote: (id: number) => void;
  setFieldValue: (
    field: string,
    value: string | number
  ) => Promise<void> | Promise<FormikErrors<ImportCalculator>>;
  calculate: VoidFunction;
  reportValues: ApexAxisChartSeries;
  totalFOB: number;
  isSubmitting: boolean;
  submitForm: VoidFunction;
}

export const CalculatorContext = createContext<Context>({} as Context);

interface Props {
  fetchedValues?: ImportCalculator;
  children: ReactNode;
}

export const ImportCalculatorProvider: FC<Props> = ({
  children,
  fetchedValues,
}) => {
  const { push } = useRouter();
  const [reportValues, setReportValues] = useState<ApexAxisChartSeries>([]);
  const [totalFOB, setTotalFOB] = useState(0);

  const handleSubmitForm = async (
    formData: ImportCalculator,
    actions: FormikHelpers<ImportCalculator>
  ) => {
    if (!formData.items.length) {
      actions.setSubmitting(false);
      return;
    }

    const id = await ImportCalculationsFirebase.upsert(formData);

    if (id) {
      push(PATH_DASHBOARD.calculator.view(id));
      actions.setSubmitting(false);
    }
  };

  const {
    values,
    errors,
    touched,
    isSubmitting,
    handleChange,
    resetForm,
    setValues,
    setFieldValue,
    submitForm,
  } = useFormik<ImportCalculator>({
    initialValues: IMPORT_CALCULATOR_INITIAL_VALUE,
    onSubmit: handleSubmitForm,
    validationSchema: toFormikValidationSchema(
      ImportCalculatorValidationSchema
    ),
  });

  const addRow = useCallback(() => {
    setValues((prevState) => ({
      ...prevState,
      items: [...prevState.items, IMPORT_CALCULATOR_NEW_ROW],
    }));
  }, [setValues]);

  const deleteRow = useCallback(
    (id: number) => {
      setValues((prevState) => ({
        ...prevState,
        items: prevState.items.filter((_, index) => index !== id),
      }));
    },
    [setValues]
  );

  const addNote = useCallback(
    (body: string) => {
      setValues((prevState) => ({
        ...prevState,
        notes: [...(prevState.notes || []), body],
      }));
    },
    [setValues]
  );

  const deleteNote = useCallback(
    (id: number) => {
      setValues((prevState) => ({
        ...prevState,
        notes: (prevState.notes || []).filter((_, index) => index !== id),
      }));
    },
    [setValues]
  );

  const calculate = useCallback(() => {
    const { pricesArray, articlesReport } = calculateImportation(values);

    setTotalFOB(articlesReport.reduce((acc, item) => acc + item.FOB, 0));
    setReportValues(getImportReport(articlesReport));

    setValues((prevValue) => ({
      ...prevValue,
      items: prevValue.items.map((item, index) => ({
        ...item,
        unitPrice: pricesArray[index],
      })),
    }));
  }, [setValues, values]);

  const resetCalculator = useCallback(() => {
    resetForm({ values: IMPORT_CALCULATOR_INITIAL_VALUE });
    setReportValues([]);
    setTotalFOB(0);
  }, [resetForm]);

  useEffect(() => {
    if (fetchedValues) {
      setValues(fetchedValues);
    }
  }, [fetchedValues, setValues]);

  const contextValue: Context = useMemo(
    () => ({
      values,
      errors,
      touched,
      handleChange,
      resetForm: resetCalculator,
      addRow,
      deleteRow,
      addNote,
      deleteNote,
      setFieldValue,
      calculate,
      reportValues,
      totalFOB,
      isSubmitting,
      submitForm,
    }),
    [
      addNote,
      addRow,
      calculate,
      deleteNote,
      deleteRow,
      errors,
      handleChange,
      resetCalculator,
      setFieldValue,
      touched,
      values,
      reportValues,
      totalFOB,
      isSubmitting,
      submitForm,
    ]
  );
  return (
    <CalculatorContext.Provider value={contextValue}>
      <form>{children}</form>
    </CalculatorContext.Provider>
  );
};
