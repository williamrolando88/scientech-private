import { COLLECTIONS_ENUM } from '@src/lib/enums/collections';
import { converterByType } from '@src/services/firestore/expenses/converters';
import { DB } from '@src/settings/firebase';
import { ExpenseTypeValuesOld } from '@src/types/expenses';
import { collection, getDocs, query, where } from 'firebase/firestore';

const listByType = (type: ExpenseTypeValuesOld) => {
  const converter = converterByType[type];

  return async () => {
    const q = query(
      collection(DB, COLLECTIONS_ENUM.EXPENSES),
      where('type', '==', type)
    ).withConverter(converter);

    const querySnapshot = await getDocs(q);

    const expenses = querySnapshot.docs.map((document) => document.data());

    return expenses as unknown[];
  };
};

export const Expenses = {
  listByType,
};
