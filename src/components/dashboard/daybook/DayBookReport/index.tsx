import { CardContent, CardHeader } from '@mui/material';
import { FC, useMemo, useState } from 'react';
import Scrollbar from 'src/components/shared/scrollbar';
import { useListDayBookTransactions } from 'src/hooks/cache/dayBook';
import { getDayBookTransactions } from 'src/lib/modules/dayBook';
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

        <AccountReport account={selectedAccount} />
      </CardContent>
    </>
  );
};

export default DayBookReport;

interface AccountReportProps {
  account: string;
}

const AccountReport: FC<AccountReportProps> = ({ account }) => {
  const { data: transactions } = useListDayBookTransactions();

  const dayBookTableEntries = useMemo(
    () =>
      getDayBookTransactions(transactions).filter(
        (t) => t.account_id === account
      ),
    [transactions, account]
  );

  return (
    <Scrollbar>
      <pre>{JSON.stringify(dayBookTableEntries, null, 2)}</pre>
    </Scrollbar>
  );
};
