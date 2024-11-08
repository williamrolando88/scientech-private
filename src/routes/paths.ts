import { path } from '@src/lib/utils/path';

const ROOTS_AUTH = '/auth';
const ROOTS_DASHBOARD = '/dashboard';

export const PATH_AUTH = {
  root: ROOTS_AUTH,
  login: path(ROOTS_AUTH, '/login'),
};

export const PATH_DASHBOARD = {
  root: ROOTS_DASHBOARD,
  home: path(ROOTS_DASHBOARD, 'home'),
  calculator: {
    root: path(ROOTS_DASHBOARD, 'import-calculator'),
    list: path(ROOTS_DASHBOARD, 'import-calculator', 'list'),
    new: path(ROOTS_DASHBOARD, 'import-calculator', 'new'),
    open: (id: string) => path(ROOTS_DASHBOARD, 'import-calculator', id),
  },
  clients: {
    root: path(ROOTS_DASHBOARD, 'clients'),
    list: path(ROOTS_DASHBOARD, 'clients', 'list'),
    new: path(ROOTS_DASHBOARD, 'clients', 'new'),
    open: (id: string) => path(ROOTS_DASHBOARD, 'clients', id),
  },
  projects: {
    root: path(ROOTS_DASHBOARD, 'projects'),
    list: path(ROOTS_DASHBOARD, 'projects', 'list'),
    new: path(ROOTS_DASHBOARD, 'projects', 'new'),
    open: (id: string) => path(ROOTS_DASHBOARD, 'projects', id),
  },
  purchases: {
    root: path(ROOTS_DASHBOARD, 'purchases'),
    invoices: path(ROOTS_DASHBOARD, 'purchases', 'invoices'),
    customsPayments: path(ROOTS_DASHBOARD, 'purchases', 'customs-payments'),
    sellNote: path(ROOTS_DASHBOARD, 'purchases', 'sale-note'),
    nonDeductibles: path(ROOTS_DASHBOARD, 'purchases', 'non-deductibles'),
  },
  sells: {
    root: path(ROOTS_DASHBOARD, 'sells'),
    invoices: path(ROOTS_DASHBOARD, 'sells', 'invoices'),
  },
  dayBook: {
    root: path(ROOTS_DASHBOARD, 'day-book'),
  },
  banking: {
    root: path(ROOTS_DASHBOARD, 'banking'),
    accounts: {
      root: path(ROOTS_DASHBOARD, 'banking', 'accounts'),
      open: (id: string) => path(ROOTS_DASHBOARD, 'banking', 'accounts', id),
    },
    creditCards: {
      root: path(ROOTS_DASHBOARD, 'banking', 'credit-cards'),
      open: (id: string) =>
        path(ROOTS_DASHBOARD, 'banking', 'credit-cards', id),
    },
  },
  accountCategories: {
    root: path(ROOTS_DASHBOARD, 'account-categories'),
  },
  documentParser: {
    root: path(ROOTS_DASHBOARD, 'document-parser'),
    invoice: path(ROOTS_DASHBOARD, 'document-parser', 'invoice'),
    holding: path(ROOTS_DASHBOARD, 'document-parser', 'holding'),
  },
};
