import { CardContent, CardHeader, Stack } from '@mui/material';
import { COLLECTIONS } from '@src/services/firestore/collections';
import { doubleEntryAccountingConverter } from '@src/services/firestore/doubleEntryAccounting';
import { DoubleEntryAccounting } from '@src/types/doubleEntryAccounting';
import { getDocs, orderBy, query } from 'firebase/firestore';
import { FC, useState } from 'react';
import { LOCAL_STORAGE } from 'src/lib/enums/localStorage';
import { useEffectOnce, useLocalStorage } from 'usehooks-ts';
import { AccountReport } from './AccountReport';
import { AccountSelector } from './AccountSelector';

const DayBookReportByAccount: FC = () => {
  const [selectedAccount, setSelectedAccount] = useLocalStorage(
    LOCAL_STORAGE.ACCOUNT_TO_REPORT,
    ''
  );
  const [accountingData, setAccountingData] = useState<DoubleEntryAccounting[]>(
    []
  );

  const getAccountingEntries = async () => {
    const querySnapshot = await getDocs(
      query(
        COLLECTIONS.DOUBLE_ENTRY_ACCOUNTING.withConverter(
          doubleEntryAccountingConverter
        ),
        orderBy('issueDate', 'desc')
      )
    );

    const accountingDocuments = querySnapshot.docs.map((d) => d.data());
    setAccountingData(accountingDocuments);
  };

  useEffectOnce(() => {
    getAccountingEntries();
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
