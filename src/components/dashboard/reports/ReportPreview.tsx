import { Card, Stack } from '@mui/material';
import { Sale } from '@src/types/sale';
import { FC } from 'react';

interface Props {
  data: Sale[];
  searchKey: string;
}

const ReportPreview: FC<Props> = ({ data, searchKey }) => {
  console.log('first');

  return (
    <Card sx={{ p: 4 }}>
      <Stack>
        {data.map((d, i) => (
          <pre key={i}>{JSON.stringify(d[searchKey], null, 2)}</pre>
        ))}
      </Stack>
    </Card>
  );
};

export default ReportPreview;
