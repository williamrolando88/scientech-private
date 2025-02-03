import Iconify from '@src/components/shared/iconify';
import Label from '@src/components/shared/label';
import { useListProjects } from '@src/hooks/cache/projects';
import { PATH_DASHBOARD } from '@src/routes/paths';
import {
  CustomsPayment,
  NonDeductible,
  ReceivedInvoice,
  SaleNote,
} from '@src/types/purchases';
import { BillingDocument } from '@src/types/sale';
import Link from 'next/link';
import { FC } from 'react';

interface Props {
  row:
    | SaleNote
    | CustomsPayment
    | NonDeductible
    | ReceivedInvoice
    | BillingDocument;
}

const ProjectTableAction: FC<Props> = ({ row }) => {
  const { data: projectsList } = useListProjects();

  const project = projectsList?.find((p) => p.id === row.ref?.projectId);

  if (!project) return <Label>N/A</Label>;

  return (
    <Link href={PATH_DASHBOARD.projects.open(row.ref?.projectId ?? '')}>
      <Label variant="soft" color="info" sx={{ cursor: 'pointer' }}>
        {project.number ?? '--'}
        <Iconify icon="pajamas:link" sx={{ ml: 1 }} width={15} />
      </Label>
    </Link>
  );
};

export default ProjectTableAction;
