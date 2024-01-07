import { Stack } from '@mui/material';
import { FC, useState } from 'react';
import { DropdownSection } from './DropdownSection';

const InvoiceParser: FC = () => {
  const [files, setFiles] = useState<(File | string)[]>([]);

  return (
    <Stack>
      <DropdownSection files={files} setFiles={setFiles} />
    </Stack>
  );
};

export default InvoiceParser;
