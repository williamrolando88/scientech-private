import { getDoc, setDoc } from 'firebase/firestore';
import {
  AccountCategoryDict,
  AccountCategoryDoc,
} from 'src/types/accountCategories';
import { APPLICATION_SETTINGS } from '../collections';

const upsert = async (accounts: AccountCategoryDict) => {
  const docBody: AccountCategoryDoc = {
    accounts,
    lastUpdate: Date.now(),
  };

  await setDoc(APPLICATION_SETTINGS.ACCOUNT_CATEGORIES, docBody);
  return accounts;
};

const list = async (): Promise<AccountCategoryDict> => {
  const docSnap = await getDoc(APPLICATION_SETTINGS.ACCOUNT_CATEGORIES);
  if (docSnap.exists()) {
    return docSnap.data().accounts as AccountCategoryDict;
  }

  return {};
};

export const AccountCategories = {
  upsert,
  list,
};
