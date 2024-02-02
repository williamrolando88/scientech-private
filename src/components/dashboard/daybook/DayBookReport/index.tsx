import { CardContent, CardHeader } from '@mui/material';
import { FC, useState } from 'react';
import { AccountSelector } from './AccountSelector';

const DayBookReport: FC = () => {
  const [selectedAccount, setSelectedAccount] = useState('');

  return (
    <>
      <CardHeader title="Reporte por cuenta contable" />
      <CardContent>
        <AccountSelector
          selectedAccount={selectedAccount}
          setSelectedAccount={setSelectedAccount}
        />

        {selectedAccount && <p>Reporte de la cuenta {selectedAccount}</p>}
      </CardContent>
    </>
  );
};

export default DayBookReport;
