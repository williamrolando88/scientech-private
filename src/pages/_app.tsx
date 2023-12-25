import 'simplebar-react/dist/simplebar.min.css';

import 'yet-another-react-lightbox/plugins/captions.css';
import 'yet-another-react-lightbox/plugins/thumbnails.css';
import 'yet-another-react-lightbox/styles.css';

import 'mapbox-gl/dist/mapbox-gl.css';

import 'react-quill/dist/quill.snow.css';

import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';

import 'react-lazy-load-image-component/src/effects/blur.css';

import { CacheProvider, EmotionCache } from '@emotion/react';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { NextPage } from 'next';
import { AppProps } from 'next/app';
import Head from 'next/head';
import { AuthProvider } from '../auth/FirebaseContext';
import { MotionLazyContainer } from '../components/animate';
import { StyledChart } from '../components/chart';
import ProgressBar from '../components/progress-bar';
import { SettingsProvider, ThemeSettings } from '../components/settings';
import SnackbarProvider from '../components/snackbar';
import ThemeProvider from '../theme';
import createEmotionCache from '../utils/createEmotionCache';

const clientSideEmotionCache = createEmotionCache();

type NextPageWithLayout = NextPage & {
  getLayout?: (page: React.ReactElement) => React.ReactNode;
};

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
  Component: NextPageWithLayout;
}

export default function MyApp(props: MyAppProps) {
  const { Component, pageProps, emotionCache = clientSideEmotionCache } = props;

  const getLayout = Component.getLayout ?? ((page) => page);

  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>

      <AuthProvider>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <SettingsProvider>
            <MotionLazyContainer>
              <ThemeProvider>
                <ThemeSettings>
                  <SnackbarProvider>
                    <StyledChart />
                    <ProgressBar />
                    {getLayout(<Component {...pageProps} />)}
                  </SnackbarProvider>
                </ThemeSettings>
              </ThemeProvider>
            </MotionLazyContainer>
          </SettingsProvider>
        </LocalizationProvider>
      </AuthProvider>
    </CacheProvider>
  );
}
