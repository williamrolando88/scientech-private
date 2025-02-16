import { Card, Stack } from '@mui/material';
import { extractSearchResults, parseToCSV } from '@src/lib/modules/reports';
import { Sale } from '@src/types/sale';
import { FC } from 'react';
import DownloadReportButton from './ReportPreview/DownloadReportButton';
import PreviewTable from './ReportPreview/PreviewTable';

interface Props {
  data: Sale[];
  searchKey: string;
}

const ReportPreview: FC<Props> = ({ data, searchKey }) => {
  if (!data || !data.length) {
    return <Card sx={{ p: 4 }}>No existe información para mostrar</Card>;
  }

  const reportData = extractSearchResults(data, searchKey);
  const csvData = parseToCSV(reportData);

  return (
    <Stack component={Card} sx={{ p: 4 }} gap={4}>
      <DownloadReportButton reportData={reportData} searchKey={searchKey} />
      <PreviewTable csvData={csvData} />
    </Stack>
  );
};

export default ReportPreview;
