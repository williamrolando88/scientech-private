import { GridActionsCellItem } from '@mui/x-data-grid';
import Iconify from '@src/components/shared/iconify';
import { Sale } from '@src/types/sale';

type SaleSetter = (sale: Sale) => void;

interface Props {
  row: Sale;
  onSaleUpdate: SaleSetter;
  onSaleDelete: SaleSetter;
  onWithholdingOpen: SaleSetter;
  onWithholdingDelete: SaleSetter;
}

export function BillingDocumentActions({
  row,
  onSaleDelete,
  onSaleUpdate,
  onWithholdingDelete,
  onWithholdingOpen,
}: Props) {
  const defaultOptions = [
    <GridActionsCellItem
      label="Modificar factura"
      onClick={() => onSaleUpdate(row)}
      icon={<Iconify icon="pajamas:doc-changes" />}
      showInMenu
    />,
    <GridActionsCellItem
      label="Borrar factura"
      onClick={() => onSaleDelete(row)}
      icon={<Iconify icon="pajamas:remove" />}
      showInMenu
    />,
  ];

  if (row.withholding) {
    const withholdingOptions = [
      <GridActionsCellItem
        label={
          row.withholding.unlocked ? 'Editar retención' : 'Visualizar retención'
        }
        onClick={() => onWithholdingOpen(row)}
        icon={<Iconify icon="pajamas:review-list" />}
        sx={{
          borderTop: '1px solid #ddd',
        }}
        showInMenu
      />,
      <GridActionsCellItem
        label="Borrar retención"
        onClick={() => onWithholdingDelete(row)}
        icon={<Iconify icon="pajamas:remove" />}
        showInMenu
      />,
    ];

    defaultOptions.push(...withholdingOptions);
  }

  return defaultOptions;
}
