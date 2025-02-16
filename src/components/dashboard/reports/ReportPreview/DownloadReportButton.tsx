import { Button } from '@mui/material';
import Iconify from '@src/components/shared/iconify';
import { parseToCSV } from '@src/lib/modules/reports';
import { downloadFile } from '@src/lib/utils/downloadFile';
import { FC } from 'react';

interface Props {
  reportData: Record<string, any>[];
  searchKey: string;
}

const DownloadReportButton: FC<Props> = ({ reportData, searchKey }) => {
  const exportableData = parseToCSV(reportData, 'file');

  const handleClick = async (csvData: string) => {
    await downloadFile(csvData, `${searchKey}.csv`);
  };

  return (
    <Button
      variant="contained"
      sx={{ alignSelf: 'end' }}
      onClick={() => handleClick(exportableData)}
    >
      <Iconify icon="pajamas:download" mr={1} />
      Descargar CSV
    </Button>
  );
};

export default DownloadReportButton;
