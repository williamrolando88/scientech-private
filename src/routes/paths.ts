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
  client: {
    root: path(ROOTS_DASHBOARD, 'client'),
    list: path(ROOTS_DASHBOARD, 'client', 'list'),
    new: path(ROOTS_DASHBOARD, 'client', 'new'),
    open: (id: string) => path(ROOTS_DASHBOARD, 'client', id),
  },
  projects: {
    root: path(ROOTS_DASHBOARD, 'projects'),
    list: path(ROOTS_DASHBOARD, 'projects', 'list'),
    new: path(ROOTS_DASHBOARD, 'projects', 'new'),
    open: (id: string) => path(ROOTS_DASHBOARD, 'projects', id),
  },
  receivedInvoices: {
    root: path(ROOTS_DASHBOARD, 'received-invoices'),
    list: path(ROOTS_DASHBOARD, 'received-invoices', 'list'),
    new: path(ROOTS_DASHBOARD, 'received-invoices', 'new'),
    open: (id: string) => path(ROOTS_DASHBOARD, 'received-invoices', id),
  },
  issuedInvoices: {
    root: path(ROOTS_DASHBOARD, 'issued-invoices'),
    list: path(ROOTS_DASHBOARD, 'issued-invoices', 'list'),
    new: path(ROOTS_DASHBOARD, 'issued-invoices', 'new'),
    open: (id: string) => path(ROOTS_DASHBOARD, 'issued-invoices', id),
  },
  dayBook: {
    root: path(ROOTS_DASHBOARD, 'day-book'),
  },
  accountCategories: {
    root: path(ROOTS_DASHBOARD, 'account-categories'),
  },
  documentParser: {
    root: path(ROOTS_DASHBOARD, 'document-parser'),
    invoice: path(ROOTS_DASHBOARD, 'document-parser', 'invoice'),
  },
};
