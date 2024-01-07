// routes
import { PATH_DASHBOARD } from '../../routes/paths';
// components
import SvgColor from '../../components/shared/svg-color';

// ----------------------------------------------------------------------

const icon = (name: string) => (
  <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />
);

const ICONS = {
  blog: icon('ic_blog'),
  cart: icon('ic_cart'),
  chat: icon('ic_chat'),
  mail: icon('ic_mail'),
  user: icon('ic_user'),
  file: icon('ic_file'),
  lock: icon('ic_lock'),
  label: icon('ic_label'),
  blank: icon('ic_blank'),
  kanban: icon('ic_kanban'),
  folder: icon('ic_folder'),
  banking: icon('ic_banking'),
  booking: icon('ic_booking'),
  invoice: icon('ic_invoice'),
  calendar: icon('ic_calendar'),
  disabled: icon('ic_disabled'),
  external: icon('ic_external'),
  menuItem: icon('ic_menu_item'),
  ecommerce: icon('ic_ecommerce'),
  analytics: icon('ic_analytics'),
  dashboard: icon('ic_dashboard'),
};

const navConfig = [
  {
    subheader: 'General',
    items: [
      { title: 'home', path: PATH_DASHBOARD.home, icon: ICONS.dashboard },
      {
        title: 'Calcular Importación',
        path: PATH_DASHBOARD.calculator.root,
        icon: ICONS.invoice,
      },
    ],
  },
  {
    subheader: 'Contabilidad',
    items: [
      {
        title: 'Libro Diario',
        path: PATH_DASHBOARD.dayBook.root,
        icon: ICONS.analytics,
      },
      {
        title: 'Cuentas contables',
        path: PATH_DASHBOARD.accountabilityAccounts.root,
        icon: ICONS.menuItem,
      },
    ],
  },
];

export default navConfig;
