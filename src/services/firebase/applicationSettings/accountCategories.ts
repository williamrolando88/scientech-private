import { doc, getDoc, setDoc } from 'firebase/firestore';
import { APPLICATION_SETTINGS, COLLECTIONS } from 'src/lib/enums/collections';
import { DB } from 'src/settings/firebase';
import {
  AccountCategoryDict,
  AccountCategoryDoc,
} from 'src/types/accountCategories';

const upsert = async (accounts: AccountCategoryDict) => {
  const docRef = doc(
    DB,
    COLLECTIONS.APPLICATION_SETTINGS,
    APPLICATION_SETTINGS.ACCOUNT_CATEGORIES
  );

  const docBody: AccountCategoryDoc = {
    accounts,
    lastUpdate: Date.now(),
  };

  await setDoc(docRef, docBody);
  return docRef.id;
};

const list = async (): Promise<AccountCategoryDict> => {
  const docRef = doc(
    DB,
    COLLECTIONS.APPLICATION_SETTINGS,
    APPLICATION_SETTINGS.ACCOUNT_CATEGORIES
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
