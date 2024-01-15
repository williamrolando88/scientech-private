import { doc, getDoc, setDoc } from 'firebase/firestore';
import { APPLICATION_SETTINGS, COLLECTIONS } from 'src/lib/enums/collections';
import { DB } from 'src/settings/firebase';
import {
  AccountCategoryDoc,
  AccountCategoryRecord,
} from 'src/types/accountCategories';

const upsert = async (accounts: AccountCategoryRecord) => {
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

const list = async (): Promise<AccountCategoryRecord> => {
  const docRef = doc(
    DB,
    COLLECTIONS.APPLICATION_SETTINGS,
    APPLICATION_SETTINGS.ACCOUNT_CATEGORIES
  );

  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    return docSnap.data().accounts as AccountCategoryRecord;
  }

  return {};
};

export const AccountCategories = {
  upsert,
  list,
};
