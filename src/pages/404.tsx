import { Button, Typography } from '@mui/material';
import { m } from 'framer-motion';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { MotionContainer, varBounce } from 'src/components/shared/animate';
import CompactLayout from 'src/components/shared/layouts/compact/CompactLayout';
import { PageNotFoundIllustration } from '../assets/illustrations';

Page404.getLayout = (page: React.ReactElement) => (
  <CompactLayout>{page}</CompactLayout>
);

export default function Page404() {
  const router = useRouter();
  return (
    <>
      <Head>
        <title> 404 Page Not Found | Minimal UI</title>
      </Head>

      <MotionContainer>
        <m.div variants={varBounce().in}>
          <Typography variant="h3" paragraph>
            Sorry, page not found!
          </Typography>
        </m.div>

        <m.div variants={varBounce().in}>
          <Typography sx={{ color: 'text.secondary' }}>
            Sorry, we couldn’t find the page you’re looking for. Perhaps you’ve
            mistyped the URL? Be sure to check your spelling.
          </Typography>
        </m.div>

        <m.div variants={varBounce().in}>
          <PageNotFoundIllustration
            sx={{
              height: 260,
              my: { xs: 5, sm: 10 },
            }}
          />
        </m.div>

        <Button onClick={router.back} size="large" variant="contained">
          Go Back
        </Button>
      </MotionContainer>
    </>
  );
}
