import { Box, Button, InputAdornment, Stack, Typography } from '@mui/material';
import Head from 'next/head';
import CompactLayout from 'src/components/layouts/compact/CompactLayout';
import { ComingSoonIllustration } from '../assets/illustrations';
import { CustomTextField } from '../components/shared/custom-input';
import useCountdown from '../hooks/useCountdown';

ComingSoonPage.getLayout = (page: React.ReactElement) => <CompactLayout>{page}</CompactLayout>;

export default function ComingSoonPage() {
  const { days, hours, minutes, seconds } = useCountdown(new Date('07/07/2024 21:30'));

  return (
    <>
      <Head>
        <title> Coming Soon | Minimal UI</title>
      </Head>

      <Typography variant="h3" paragraph>
        Coming Soon!
      </Typography>

      <Typography sx={{ color: 'text.secondary' }}>
        We are currently working hard on this page!
      </Typography>

      <ComingSoonIllustration sx={{ my: 10, height: 240 }} />

      <Stack
        direction="row"
        justifyContent="center"
        divider={<Box sx={{ mx: { xs: 1, sm: 2.5 } }}>:</Box>}
        sx={{ typography: 'h2' }}
      >
        <TimeBlock label="Days" value={days} />

        <TimeBlock label="Hours" value={hours} />

        <TimeBlock label="Minutes" value={minutes} />

        <TimeBlock label="Seconds" value={seconds} />
      </Stack>

      <CustomTextField
        fullWidth
        placeholder="Enter your email"
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <Button variant="contained" size="large">
                Notify Me
              </Button>
            </InputAdornment>
          ),
          sx: { pr: 0.5 },
        }}
        sx={{ my: 5 }}
      />
    </>
  );
}

type TimeBlockProps = {
  label: string;
  value: string;
};

function TimeBlock({ label, value }: TimeBlockProps) {
  return (
    <div>
      <Box> {value} </Box>
      <Box sx={{ color: 'text.secondary', typography: 'body1' }}>{label}</Box>
    </div>
  );
}
