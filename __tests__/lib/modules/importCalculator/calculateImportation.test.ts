import {
  _mockedEmptyMultiItemImportation,
  _mockedEmptySingleItemImportation,
} from '@mocks/importCalculator/inputs';
import {
  _expectedEmptyMultiItemImportation,
  _expectedEmptySingleItemImportation,
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
});
