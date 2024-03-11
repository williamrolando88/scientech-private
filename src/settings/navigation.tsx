import SvgColor from 'src/components/shared/svg-color';
import { PATH_DASHBOARD } from 'src/routes/paths';

const icon = (name: string) => (
  <SvgColor
    src={`/assets/icons/navbar/${name}.svg`}
    sx={{ width: 1, height: 1 }}
  />
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
    subheader: 'Operaciones',
    items: [
      {
        title: 'Calcular Importación',
        path: PATH_DASHBOARD.calculator.root,
        icon: ICONS.ecommerce,
      },
      {
        title: 'Proyectos',
        path: PATH_DASHBOARD.projects.root,
        icon: ICONS.folder,
      },
      {
        title: 'Clientes',
        path: PATH_DASHBOARD.clients.root,
        icon: ICONS.user,
      },
    ],
  },
  {
    subheader: 'Contabilidad',
    items: [
      {
        title: 'Comprobantes',
        path: PATH_DASHBOARD.vouchers.root,
        icon: ICONS.invoice,
        children: [
          {
            title: 'Facturas Emitidas',
            path: PATH_DASHBOARD.vouchers.issued.root,
          },
          {
            title: 'Facturas Recibidas',
            path: PATH_DASHBOARD.vouchers.received.root,
          },
        ],
      },
      {
        title: 'Libro Diario',
        path: PATH_DASHBOARD.dayBook.root,
        icon: ICONS.analytics,
      },
      {
        title: 'Cuentas contables',
        path: PATH_DASHBOARD.accountCategories.root,
        icon: ICONS.menuItem,
      },
    ],
  },
  {
    subheader: 'Herramientas',
    items: [
      {
        title: 'Lector de documentos',
        path: PATH_DASHBOARD.documentParser.root,
        icon: ICONS.file,
        children: [
          { title: 'Facturas', path: PATH_DASHBOARD.documentParser.invoice },
        ],
      },
    ],
  },
];

export default navConfig;
