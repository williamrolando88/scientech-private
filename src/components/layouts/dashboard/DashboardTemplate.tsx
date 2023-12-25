import { Container } from '@mui/material';
import Head from 'next/head';
import { FC } from 'react';
import CustomBreadcrumbs, {
  CustomBreadcrumbsProps,
} from 'src/components/shared/custom-breadcrumbs';
import { useSettingsContext } from 'src/components/shared/settings';

interface DashboardTemplateProps extends CustomBreadcrumbsProps {
  children: React.ReactNode;
  documentTitle?: string;
}

const DashboardTemplate: FC<DashboardTemplateProps> = ({
  children,
  documentTitle,
  ...customBreadcrumbsProps
}) => {
  const { themeStretch } = useSettingsContext();

  return (
    <>
      <Head>
        <title>{documentTitle || 'Dashboard'} | Scientech</title>
      </Head>

      <Container maxWidth={themeStretch ? false : 'lg'}>
        <CustomBreadcrumbs {...customBreadcrumbsProps} />

        {children}
      </Container>
    </>
  );
};

export default DashboardTemplate;
