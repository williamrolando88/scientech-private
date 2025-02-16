import { Card } from '@mui/material';
import { extractSearchResults } from '@src/lib/modules/reports';
import { Sale } from '@src/types/sale';
import { FC } from 'react';
import PreviewTable from './ReportPreview/PreviewTable';

interface Props {
  data: Sale[];
  searchKey: string;
}

const ReportPreview: FC<Props> = ({ data, searchKey }) => {
  console.log('first');

  return (
    <Card sx={{ p: 4 }}>
      <PreviewTable csvData={extractSearchResults(data, searchKey) as string} />
    </Card>
  );
};

export default ReportPreview;
