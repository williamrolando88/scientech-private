import { doc, getDoc, setDoc } from 'firebase/firestore';
import { COLLECTIONS_ENUM, SETTING_ENUM } from 'src/lib/enums/collections';
import { DB } from 'src/settings/firebase';
import {
  AccountCategoryDict,
  AccountCategoryDoc,
} from 'src/types/accountCategories';

const upsert = async (accounts: AccountCategoryDict) => {
  const docRef = doc(
    DB,
    COLLECTIONS_ENUM.APPLICATION_SETTINGS,
    SETTING_ENUM.ACCOUNT_CATEGORIES
  );

  const docBody: AccountCategoryDoc = {
    accounts,
    lastUpdate: Date.now(),
  };

  await setDoc(docRef, docBody);
  return accounts;
};

const list = async (): Promise<AccountCategoryDict> => {
  const docRef = doc(
    DB,
    COLLECTIONS_ENUM.APPLICATION_SETTINGS,
    SETTING_ENUM.ACCOUNT_CATEGORIES
  );

  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    return docSnap.data().accounts as AccountCategoryDict;
  }

  return {};
};

export const AccountCategories = {
  upsert,
  list,
};
