import { Stack } from '@mui/material';
import DashboardTemplate from 'src/components/shared/layouts/dashboard/DashboardTemplate';

export default function Page() {
  return (
    <DashboardTemplate documentTitle="Admin" heading="Admin Tools">
      <Stack>Here comes admin Tools</Stack>
    </DashboardTemplate>
  );
}
