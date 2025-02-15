import { Purchase } from '@src/types/purchases';
import { Sale } from '@src/types/sale';
import { FC, useState } from 'react';
import ReportPreview from './ReportPreview';
import FetchReportData from './ReportsForm';

const Reports: FC = () => {
  const [dat, setData] = useState<Sale[] | Purchase[]>([]);
  console.log('first');

  return (
    <>
      <FetchReportData />
      <ReportPreview />
    </>
  );
};

export default Reports;
