import { CardContent, CardHeader, Stack } from '@mui/material';
import { useCollectionSnapshot } from '@src/hooks/useCollectionSnapshot';
import { COLLECTIONS } from '@src/services/firestore/collections';
import { doubleEntryAccountingConverter } from '@src/services/firestore/doubleEntryAccounting';
import { DoubleEntryAccounting } from '@src/types/doubleEntryAccounting';
import { FC } from 'react';
import { LOCAL_STORAGE } from 'src/lib/enums/localStorage';
import { useLocalStorage } from 'usehooks-ts';
import { AccountReport } from './AccountReport';
import { AccountSelector } from './AccountSelector';

const DayBookReportByAccount: FC = () => {
  const [selectedAccount, setSelectedAccount] = useLocalStorage(
    LOCAL_STORAGE.ACCOUNT_TO_REPORT,
    ''
  );

  const accountingData = useCollectionSnapshot<DoubleEntryAccounting>({
    collection: COLLECTIONS.DOUBLE_ENTRY_ACCOUNTING,
    converter: doubleEntryAccountingConverter,
    order: { field: 'issueDate', direction: 'desc' },
  });

  return (
    <>
      <CardHeader title="Reporte por cuenta contable" />
      <Stack component={CardContent} gap={2}>
        <AccountSelector
          accountingData={accountingData}
          selectedAccount={selectedAccount}
          setSelectedAccount={setSelectedAccount}
        />
        {selectedAccount ? (
          <AccountReport
            account={selectedAccount}
            accountingData={accountingData}
          />
        ) : (
          'Selecciona una cuenta contable para ver el reporte'
        )}
      </Stack>
    </>
  );
};

export default DayBookReportByAccount;
