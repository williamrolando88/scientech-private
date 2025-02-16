import { Box, Grid } from '@mui/material';
import Scrollbar from '@src/components/shared/scrollbar';
import { CSV_PARSER_CONFIG } from '@src/lib/constants/settings';
import { FC } from 'react';
import TableData from './TableData';
import TableHeader from './TableHeader';

interface Props {
  csvData: string;
}

const PreviewTable: FC<Props> = ({ csvData }) => {
  if (!csvData || !csvData.length) {
    return null;
  }

  const tableContent = csvData.split(CSV_PARSER_CONFIG.NEW_LINE.PREVIEW);
  const header = tableContent[0];
  const data = tableContent.slice(1);

  const columnsCounter = header.split(
    CSV_PARSER_CONFIG.DELIMITER.PREVIEW
  ).length;

  return (
    <Box height={200}>
      <Scrollbar>
        <Grid
          container
          columns={columnsCounter}
          sx={{ minWidth: 110 * columnsCounter }}
        >
          <TableHeader headerString={header} />
          <TableData tableData={data} />
        </Grid>
      </Scrollbar>
    </Box>
  );
};

export default PreviewTable;
