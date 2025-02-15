import { Card, Typography } from '@mui/material';
import { useCollectionSnapshot } from '@src/hooks/useCollectionSnapshot';
import { useProjectContext } from '@src/hooks/useProjectContext';
import {
  balanceCalculator,
  calculateProfit,
} from '@src/lib/modules/balanceCalculator';
import { COLLECTIONS } from '@src/services/firestore/collections';
import { DoubleEntryAccounting } from '@src/types/doubleEntryAccounting';
import { where } from 'firebase/firestore';
import { FC } from 'react';
import OngoingProjectGraph from './ProjectResults/OngoingProjectGraph';

const ProjectResults: FC = () => {
  const { project } = useProjectContext();

  const accountingData = useCollectionSnapshot<DoubleEntryAccounting>({
    collection: COLLECTIONS.DOUBLE_ENTRY_ACCOUNTING,
    additionalQueries: [where('ref.projectId', '==', project.id)],
    order: { field: 'issueDate', direction: 'asc' },
  });

  const projectBalance = balanceCalculator(accountingData);
  const projectProfit = calculateProfit(accountingData);

  return (
    <>
      <OngoingProjectGraph accountingData={accountingData} />

      <Card>
        <Typography>Project Profit: {projectProfit}</Typography>
      </Card>

      <Card>
        <pre>{JSON.stringify(projectBalance, null, 2)}</pre>
      </Card>
    </>
  );
};

export default ProjectResults;
