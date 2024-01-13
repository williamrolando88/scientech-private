export const parseSafeNumber = (value?: unknown): number => {
  const parsedValue = parseFloat(value as string);

  // Check if the parsed value is NaN or if the input is null/undefined
  if (Number.isNaN(parsedValue) || value === null || value === undefined) {
    return 0;
  }

  return parsedValue;
};
