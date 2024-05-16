import {
  _mockedEmptyMultiItemImportation,
  _mockedEmptySingleItemImportation,
  _mockedSingleItemImportation,
} from '@mocks/importCalculator/inputs';
import {
  _expectedEmptyMultiItemImportation,
  _expectedEmptySingleItemImportation,
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
});
