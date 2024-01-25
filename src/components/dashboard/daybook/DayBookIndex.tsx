import { Card } from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { FC } from 'react';
import { useListDayBookTransactions } from 'src/hooks/cache/dayBook';
import { DayBookTransaction } from 'src/types/dayBook';

const DayBookIndex: FC = () => {
  const { data: transactions, isLoading } = useListDayBookTransactions();

  const columns: GridColDef<DayBookTransaction>[] = [
    {
      field: 'id',
    },
  ];

  return (
    <Card>
      <DataGrid columns={columns} rows={transactions} loading={isLoading} />
    </Card>
  );
};

export default DayBookIndex;
