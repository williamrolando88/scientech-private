import { CardContent, CardHeader, Stack } from '@mui/material';
import { FC } from 'react';
import { LOCAL_STORAGE } from 'src/lib/enums/localStorage';
import { useLocalStorage } from 'usehooks-ts';
import { AccountReport } from './AccountReport';
import { AccountSelector } from './AccountSelector';

const DayBookReport: FC = () => {
  const [selectedAccount, setSelectedAccount] = useLocalStorage(
    LOCAL_STORAGE.ACCOUNT_TO_REPORT,
    ''
  );

  return (
    <>
      <CardHeader title="Reporte por cuenta contable" />
      <Stack component={CardContent} gap={2}>
        <AccountSelector
          selectedAccount={selectedAccount}
          setSelectedAccount={setSelectedAccount}
        />

        <AccountReport account={selectedAccount} />
      </Stack>
    </>
  );
};

export default DayBookReport;
