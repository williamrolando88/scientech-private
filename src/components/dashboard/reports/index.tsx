import { Purchase } from '@src/types/purchases';
import { Sale } from '@src/types/sale';
import { FC, useState } from 'react';
import ReportPreview from './ReportPreview';
import FetchReportData from './ReportsForm';

const Reports: FC = () => {
  const [data, setData] = useState<Sale[] | Purchase[]>([]);
  const [searchKey, setSearchKey] = useState('');

  console.log('data', data);
  console.log('searchKey', searchKey);

  return (
    <>
      <FetchReportData setData={setData} setSearchKey={setSearchKey} />
      <ReportPreview />
    </>
  );
};

export default Reports;
