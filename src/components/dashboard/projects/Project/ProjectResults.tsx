import { useCollectionSnapshot } from '@src/hooks/useCollectionSnapshot';
import { useProjectContext } from '@src/hooks/useProjectContext';
import { COLLECTIONS } from '@src/services/firestore/collections';
import { doubleEntryAccountingConverter } from '@src/services/firestore/doubleEntryAccounting';
import { DoubleEntryAccounting } from '@src/types/doubleEntryAccounting';
import { where } from 'firebase/firestore';
import { FC } from 'react';
import OngoingProjectGraph from './ProjectResults/OngoingProjectGraph';

const ProjectResults: FC = () => {
  const { project } = useProjectContext();

  const accountingData = useCollectionSnapshot<DoubleEntryAccounting>({
    collection: COLLECTIONS.DOUBLE_ENTRY_ACCOUNTING,
    converter: doubleEntryAccountingConverter,
    additionalQueries: [where('ref.projectId', '==', project.id)],
    order: { field: 'issueDate', direction: 'asc' },
  });

  return <OngoingProjectGraph accountingData={accountingData} />;
};

export default ProjectResults;
