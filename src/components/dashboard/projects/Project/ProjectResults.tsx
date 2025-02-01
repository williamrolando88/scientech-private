import { Stack } from '@mui/material';
import { useCollectionSnapshot } from '@src/hooks/useCollectionSnapshot';
import {
  balanceCalculator,
  calculateProfit,
} from '@src/lib/modules/balanceCalculator';
import { COLLECTIONS } from '@src/services/firestore/collections';
import { doubleEntryAccountingConverter } from '@src/services/firestore/doubleEntryAccounting';
import { DoubleEntryAccounting } from '@src/types/doubleEntryAccounting';
import { where } from 'firebase/firestore';
import { FC } from 'react';

interface Props {
  id: string;
}

const ProjectResults: FC<Props> = ({ id }) => {
  const accountingData = useCollectionSnapshot<DoubleEntryAccounting>({
    collection: COLLECTIONS.DOUBLE_ENTRY_ACCOUNTING,
    converter: doubleEntryAccountingConverter,
    additionalQueries: [where('ref.projectId', '==', id)],
    order: { field: 'issueDate', direction: 'desc' },
  });

  const projectTree = balanceCalculator(accountingData);
  const projectProfit = calculateProfit(accountingData);

  return (
    <Stack direction="row">
      <pre>{JSON.stringify(projectTree, null, 2)}</pre>
      <pre>Ganancia: {projectProfit}</pre>
    </Stack>
  );
};

export default ProjectResults;
