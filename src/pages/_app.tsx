import { CacheProvider, EmotionCache } from '@emotion/react';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFnsV3';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import 'mapbox-gl/dist/mapbox-gl.css';
import { NextPage } from 'next';
import { AppProps } from 'next/app';
import Head from 'next/head';
import 'react-lazy-load-image-component/src/effects/blur.css';
import 'react-quill/dist/quill.snow.css';
import 'simplebar-react/dist/simplebar.min.css';
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';
import { MotionLazyContainer } from 'src/components/shared/animate';
import { StyledChart } from 'src/components/shared/chart';
import SnackbarProvider from 'src/components/shared/snackbar/SnackbarProvider';
import ThemeProvider from 'src/lib/theme';
import { AuthProvider } from 'src/services/auth/FirebaseContext';
import 'yet-another-react-lightbox/plugins/captions.css';
import 'yet-another-react-lightbox/plugins/thumbnails.css';
import 'yet-another-react-lightbox/styles.css';
import ProgressBar from '../components/shared/progress-bar';
import { SettingsProvider, ThemeSettings } from '../components/shared/settings';
import createEmotionCache from '../lib/utils/createEmotionCache';

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

  const queryClient = new QueryClient({
    defaultOptions: {
      queries: { staleTime: 6 * 60 * 60 * 1000 },
    },
  });

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
                    <QueryClientProvider client={queryClient}>
                      <StyledChart />

                      <ProgressBar />

                      {getLayout(<Component {...pageProps} />)}

                      <ReactQueryDevtools buttonPosition="bottom-left" />
                    </QueryClientProvider>
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
