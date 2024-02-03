import { Alert, MenuItem, Stack, TextField } from '@mui/material';
import { FC } from 'react';
import { useListAccountCategories } from 'src/hooks/cache/accountCategories';
import { useListDayBookTransactions } from 'src/hooks/cache/dayBook';

interface AccountSelectorProps {
  selectedAccount: string;
  setSelectedAccount: (value: string) => void;
}
export const AccountSelector: FC<AccountSelectorProps> = ({
  selectedAccount,
  setSelectedAccount,
}) => {
  const { data: accounts } = useListAccountCategories();
  const { data: transactions } = useListDayBookTransactions();

  const usedAccounts = transactions
    ?.map((entry) => entry.transactions.map((detail) => detail.account_id))
    .flat();

  const uniqueAccounts = Array.from(new Set(usedAccounts)).sort((a, b) =>
    a.localeCompare(b)
  );

  const uniqueAccountsObjects = uniqueAccounts.map((id) => ({
    value: id,
    label: `${id} - ${accounts[id]?.name}`,
  }));

  return (
    <Stack gap={2}>
      <Alert severity="info">
        Seleccione una cuenta contable para ver el reporte.
      </Alert>

      <TextField
        select
        fullWidth
        value={selectedAccount}
        onChange={(e) => setSelectedAccount(e.target.value)}
      >
        {uniqueAccountsObjects.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </TextField>
    </Stack>
  );
};
