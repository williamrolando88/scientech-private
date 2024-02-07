import { Button, Typography } from '@mui/material';
import { m } from 'framer-motion';
import Head from 'next/head';
import NextLink from 'next/link';
import { MotionContainer, varBounce } from 'src/components/shared/animate';
import CompactLayout from 'src/components/shared/layouts/compact/CompactLayout';
import { SeverErrorIllustration } from '../assets/illustrations';

Page500.getLayout = (page: React.ReactElement) => (
  <CompactLayout>{page}</CompactLayout>
);

export default function Page500() {
  return (
    <>
      <Head>
        <title> 500 Internal Server Error | Minimal UI</title>
      </Head>

      <MotionContainer>
        <m.div variants={varBounce().in}>
          <Typography variant="h3" paragraph>
            500 Internal Server Error
          </Typography>
        </m.div>

        <m.div variants={varBounce().in}>
          <Typography sx={{ color: 'text.secondary' }}>
            There was an error, please try again later.
          </Typography>
        </m.div>

        <m.div variants={varBounce().in}>
          <SeverErrorIllustration sx={{ height: 260, my: { xs: 5, sm: 10 } }} />
        </m.div>

        <Button component={NextLink} href="/" size="large" variant="contained">
          Go to Home
        </Button>
      </MotionContainer>
    </>
  );
}
