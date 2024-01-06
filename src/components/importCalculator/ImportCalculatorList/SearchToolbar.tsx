import { TextField } from '@mui/material';
import { GridToolbarContainer } from '@mui/x-data-grid';
import { FC } from 'react';

interface SearchToolbarProps {
  value: string;
  handleChange: (value: string) => void;
}
export const SearchToolbar: FC<SearchToolbarProps> = ({ handleChange, value }) => (
  <GridToolbarContainer>
    <TextField
      name="search"
      label="Buscar"
      value={value}
      onChange={(e) => handleChange(e.target.value)}
      variant="standard"
      size="small"
      fullWidth
    />
  </GridToolbarContainer>
);
