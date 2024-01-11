import { doc, setDoc } from 'firebase/firestore';
import { AccountCategory } from 'src/@types/accountCategories';
import { APPLICATION_SETTINGS, COLLECTIONS } from 'src/lib/enums/collections';
import { DB } from 'src/settings/firebase';

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

export const AccountCategories = {
  add,
};
