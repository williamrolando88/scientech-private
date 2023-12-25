import { Box, Stack } from '@mui/material';
import Logo from 'src/components/shared/logo';
import { NavSectionMini } from 'src/components/shared/nav-section';
import { NAV } from 'src/lib/settings/global';
import navConfig from 'src/lib/settings/navigation';
import { hideScrollbarX } from 'src/utils/cssStyles';
import NavToggleButton from './NavToggleButton';

export default function NavMini() {
  return (
    <Box
      component="nav"
      sx={{
        flexShrink: { lg: 0 },
        width: { lg: NAV.W_DASHBOARD_MINI },
      }}
    >
      <NavToggleButton
        sx={{
          top: 22,
          left: NAV.W_DASHBOARD_MINI - 12,
        }}
      />

      <Stack
        sx={{
          pb: 2,
          height: 1,
          position: 'fixed',
          width: NAV.W_DASHBOARD_MINI,
          borderRight: (theme) => `dashed 1px ${theme.palette.divider}`,
          ...hideScrollbarX,
        }}
      >
        <Logo sx={{ mx: 'auto', my: 2 }} />

        <NavSectionMini data={navConfig} />
      </Stack>
    </Box>
  );
}
