import { doc, getDoc, setDoc } from 'firebase/firestore';
import { APPLICATION_SETTINGS, COLLECTIONS } from 'src/lib/enums/collections';
import { DB } from 'src/settings/firebase';
import { AccountCategory } from 'src/types/accountCategories';

const add = async (accounts: AccountCategory[]) => {
  const docRef = doc(
    DB,
    COLLECTIONS.APPLICATION_SETTINGS,
    APPLICATION_SETTINGS.ACCOUNT_CATEGORIES
  );

  const docBody = {
    accounts,
    lastUpdate: Date.now(),
  };

  await setDoc(docRef, docBody);
  return docRef.id;
};

const list = async (): Promise<AccountCategory[]> => {
  const docRef = doc(
    DB,
    COLLECTIONS.APPLICATION_SETTINGS,
    APPLICATION_SETTINGS.ACCOUNT_CATEGORIES
  );

  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    return docSnap.data().accounts as AccountCategory[];
  }

  return [];
};

export const AccountCategories = {
  add,
  list,
};
