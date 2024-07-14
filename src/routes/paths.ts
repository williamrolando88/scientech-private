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
  vouchers: {
    root: path(ROOTS_DASHBOARD, 'vouchers'),
    received: {
      root: path(ROOTS_DASHBOARD, 'vouchers', 'received'),
      list: path(ROOTS_DASHBOARD, 'vouchers', 'received', 'list'),
      new: path(ROOTS_DASHBOARD, 'vouchers', 'received', 'new'),
      open: (id: string) => path(ROOTS_DASHBOARD, 'vouchers', 'received', id),
    },
    issued: {
      root: path(ROOTS_DASHBOARD, 'vouchers', 'issued'),
      list: path(ROOTS_DASHBOARD, 'vouchers', 'issued', 'list'),
      new: path(ROOTS_DASHBOARD, 'vouchers', 'issued', 'new'),
      open: (id: string) => path(ROOTS_DASHBOARD, 'vouchers', 'issued', id),
    },
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
