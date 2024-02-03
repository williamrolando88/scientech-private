import { CardContent, CardHeader, Stack } from '@mui/material';
import { FC, useState } from 'react';
import { AccountReport } from './AccountReport';
import { AccountSelector } from './AccountSelector';

const DayBookReport: FC = () => {
  const [selectedAccount, setSelectedAccount] = useState('');

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
