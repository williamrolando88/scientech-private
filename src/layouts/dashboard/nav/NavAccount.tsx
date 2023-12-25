import { Box, Link, Typography } from '@mui/material';
import { alpha, styled } from '@mui/material/styles';
import NextLink from 'next/link';
import { useAuthContext } from '../../../auth/useAuthContext';
import { CustomAvatar } from '../../../components/custom-avatar';
import { PATH_DASHBOARD } from '../../../routes/paths';

const StyledRoot = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(2, 2.5),
  borderRadius: Number(theme.shape.borderRadius) * 1.5,
  backgroundColor: alpha(theme.palette.grey[500], 0.12),
  transition: theme.transitions.create('opacity', {
    duration: theme.transitions.duration.shorter,
  }),
}));

export default function NavAccount() {
  const { user } = useAuthContext();

  return (
    <Link component={NextLink} href={PATH_DASHBOARD.root} underline="none" color="inherit">
      <StyledRoot>
        <CustomAvatar src={user?.photoURL} alt={user?.displayName} name={user?.displayName} />

        <Box sx={{ ml: 2, minWidth: 0 }}>
          <Typography variant="subtitle2" noWrap>
            {user?.displayName}
          </Typography>

          <Typography variant="body2" noWrap sx={{ color: 'text.secondary' }}>
            {user?.role}
          </Typography>
        </Box>
      </StyledRoot>
    </Link>
  );
}
