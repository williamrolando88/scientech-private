import { COLLECTIONS_ENUM, SETTINGS_ENUM } from '@src/lib/enums/collections';
import { DB } from '@src/settings/firebase';
import { collection, doc } from 'firebase/firestore';
import { CONVERTERS } from './converters';

export const COLLECTIONS = {
  IMPORT_CALCULATIONS: collection(DB, COLLECTIONS_ENUM.IMPORT_CALCULATIONS),
  USERS: collection(DB, COLLECTIONS_ENUM.USERS),
  APPLICATION_SETTINGS: collection(DB, COLLECTIONS_ENUM.APPLICATION_SETTINGS),
  CLIENTS: collection(DB, COLLECTIONS_ENUM.CLIENTS).withConverter(
    CONVERTERS.CLIENT
  ),
  PROJECTS: collection(DB, COLLECTIONS_ENUM.PROJECTS).withConverter(
    CONVERTERS.PROJECT
  ),
  PURCHASES: collection(DB, COLLECTIONS_ENUM.PURCHASES).withConverter(
    CONVERTERS.PURCHASE
  ),
  DOUBLE_ENTRY_ACCOUNTING: collection(
    DB,
    COLLECTIONS_ENUM.DOUBLE_ENTRY_ACCOUNTING
  ).withConverter(CONVERTERS.DOUBLE_ENTRY_ACCOUNTING),
  SALES: collection(DB, COLLECTIONS_ENUM.SALES).withConverter(CONVERTERS.SALE),
};

export const APPLICATION_SETTINGS = {
  ACCOUNT_CATEGORIES: doc(
    COLLECTIONS.APPLICATION_SETTINGS,
    SETTINGS_ENUM.ACCOUNT_CATEGORIES
  ),
};
