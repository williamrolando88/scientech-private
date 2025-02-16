import { Box, Grid } from '@mui/material';
import { CSV_PARSER_CONFIG } from '@src/lib/constants/settings';
import { FC } from 'react';

interface Props {
  tableData: string[];
}

const TableData: FC<Props> = ({ tableData }) => (
  <>
    {tableData.map((row, index) =>
      row.split(CSV_PARSER_CONFIG.DELIMITER.PREVIEW).map((r, idx) => (
        <Grid key={`${index}-${idx}`} item xs={1}>
          <Box
            sx={{
              border: '1px solid',
              padding: 0.5,
            }}
          >
            {r.length > 8 ? `${r.slice(0, 8)}...` : r}
          </Box>
        </Grid>
      ))
    )}
  </>
);

export default TableData;
