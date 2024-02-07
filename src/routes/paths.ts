function path(root: string, sublink: string) {
  return `${root}${sublink}`;
}

const ROOTS_AUTH = '/auth';
const ROOTS_DASHBOARD = '/dashboard';

export const PATH_AUTH = {
  root: ROOTS_AUTH,
  login: path(ROOTS_AUTH, '/login'),
};

export const PATH_DASHBOARD = {
  root: ROOTS_DASHBOARD,
  home: path(ROOTS_DASHBOARD, '/home'),
  calculator: {
    root: path(ROOTS_DASHBOARD, '/import-calculator'),
    list: path(ROOTS_DASHBOARD, '/import-calculator/list'),
    new: path(ROOTS_DASHBOARD, '/import-calculator/new'),
    view: (id: string) => path(ROOTS_DASHBOARD, `/import-calculator/${id}`),
  },
  dayBook: {
    root: path(ROOTS_DASHBOARD, '/day-book'),
  },
  accountCategories: {
    root: path(ROOTS_DASHBOARD, '/account-categories'),
  },
  documentParser: {
    root: path(ROOTS_DASHBOARD, '/document-parser'),
    invoice: path(ROOTS_DASHBOARD, '/document-parser/invoice'),
  },
};
