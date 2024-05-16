import {
  _mockedEmptyMultiItemImportation,
  _mockedEmptySingleItemImportation,
  _mockedMultiItemImportation,
  _mockedMultiItemNoSettingsImportation,
  _mockedSelectedSingleItemImportation,
  _mockedSingleItemImportation,
} from '@mocks/importCalculator/inputs';
import {
  _expectedEmptyMultiItemImportation,
  _expectedEmptySingleItemImportation,
  _expectedMultiItemImportation,
  _expectedMultiItemNoSettingsImportation,
  _expectedSelectedSingleItemImportation,
  _expectedSingleItemImportation,
} from '@mocks/importCalculator/outputs';
import { calculateImportation } from '@src/lib/modules/importCalculator';

describe('calculateImportation', () => {
  test('should calculate the importation value of a single empty item', () => {
    const result = calculateImportation(_mockedEmptySingleItemImportation);

    expect(result).toEqual(_expectedEmptySingleItemImportation);
  });

  test('should calculate the importation value of multiple empty items', () => {
    const result = calculateImportation(_mockedEmptyMultiItemImportation);

    expect(result).toEqual(_expectedEmptyMultiItemImportation);
  });

  test('should calculate the importation value of a single item', () => {
    const result = calculateImportation(_mockedSingleItemImportation);

    expect(result).toEqual(_expectedSingleItemImportation);
  });

  test('should calculate the importation value of multiple items', () => {
    const result = calculateImportation(_mockedMultiItemImportation);

    expect(result).toEqual(_expectedMultiItemImportation);
  });

  test('should calculate the importation value of a single item if multiple items has quantity of 0', () => {
    const result = calculateImportation(_mockedSelectedSingleItemImportation);

    expect(result).toEqual(_expectedSelectedSingleItemImportation);
  });

  test('should calculate the importation value if no settings value is provided', () => {
    const result = calculateImportation(_mockedMultiItemNoSettingsImportation);

    expect(result).toEqual(_expectedMultiItemNoSettingsImportation);
  });
});
