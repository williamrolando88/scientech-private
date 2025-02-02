import { useCollectionSnapshot } from '@src/hooks/useCollectionSnapshot';
import {
  balanceCalculator,
  calculateProfit,
} from '@src/lib/modules/balanceCalculator';
import { COLLECTIONS } from '@src/services/firestore/collections';
import { doubleEntryAccountingConverter } from '@src/services/firestore/doubleEntryAccounting';
import { DoubleEntryAccounting } from '@src/types/doubleEntryAccounting';
import { Project } from '@src/types/projects';
import { where } from 'firebase/firestore';
import { FC } from 'react';
import OngoingProjectGraph from './ProjectResults/OngoingProjectGraph';

interface Props {
  project: Project;
}

const ProjectResults: FC<Props> = ({ project }) => {
  const accountingData = useCollectionSnapshot<DoubleEntryAccounting>({
    collection: COLLECTIONS.DOUBLE_ENTRY_ACCOUNTING,
    converter: doubleEntryAccountingConverter,
    additionalQueries: [where('ref.projectId', '==', project.id)],
    order: { field: 'issueDate', direction: 'desc' },
  });

  const projectTree = balanceCalculator(accountingData);
  const projectProfit = calculateProfit(accountingData);

  return <OngoingProjectGraph />;
};

export default ProjectResults;
