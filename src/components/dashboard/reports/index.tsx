import { Stack } from '@mui/material';
import { Sale } from '@src/types/sale';
import { FC, useState } from 'react';
import FetchReportData from './FetchReportData';
import ReportPreview from './ReportPreview';

const Reports: FC = () => {
  const [data, setData] = useState<Sale[]>([]);
  const [searchKey, setSearchKey] = useState('');

  return (
    <Stack gap={4}>
      <FetchReportData setData={setData} setSearchKey={setSearchKey} />

      <ReportPreview data={data} searchKey={searchKey} />
    </Stack>
  );
};

export default Reports;
