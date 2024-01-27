import { Grid, InputAdornment, Typography } from '@mui/material';
import { FC } from 'react';
import { AutoCalculateInput, AutoCalculateInputProps } from '../../../../shared/AutoCalculateInput';

type LotItemRowProps = Omit<AutoCalculateInputProps, 'sx' | 'InputProps' | 'label'> & {
  label: string;
  startAdornment?: React.ReactNode;
  endAdornment?: React.ReactNode;
};

export const LotItemRow: FC<LotItemRowProps> = ({
  label,
  startAdornment,
  endAdornment,
  ...props
}) => (
  <Grid container columns={3} alignItems="center">
    <Grid item xs={2}>
      <Typography sx={{ flexGrow: 2, pl: 2 }}>{label}</Typography>
    </Grid>

    <Grid item xs={1}>
      <AutoCalculateInput
        {...props}
        sx={{ flexGrow: 1 }}
        size="small"
        onFocus={(e) => e.target.select()}
        InputProps={{
          endAdornment: endAdornment ? (
            <InputAdornment position="end">{endAdornment}</InputAdornment>
          ) : undefined,
          startAdornment: startAdornment ? (
            <InputAdornment position="start">{startAdornment}</InputAdornment>
          ) : undefined,
        }}
        inputProps={{
          step: 0.01,
          min: 0,
        }}
      />
    </Grid>
  </Grid>
);
