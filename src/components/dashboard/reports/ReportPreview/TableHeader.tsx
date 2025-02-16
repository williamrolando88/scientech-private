import { Box, Grid } from '@mui/material';
import { CSV_PARSER_CONFIG } from '@src/lib/constants/settings';
import { FC } from 'react';

interface Props {
  headerString: string;
}

const TableHeader: FC<Props> = ({ headerString }) => (
  <>
    {headerString.split(CSV_PARSER_CONFIG.DELIMITER.PREVIEW).map((h, i) => (
      <Grid key={i} item xs={1}>
        <Box
          sx={{
            border: '1px solid',
            minWidth: 100,
            padding: 0.5,
            bgcolor: (theme) => theme.palette.divider,
          }}
        >
          {h.length > 10 ? `${h.slice(0, 10)}...` : h}
        </Box>
      </Grid>
    ))}
  </>
);

export default TableHeader;
