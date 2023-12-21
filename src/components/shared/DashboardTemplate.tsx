import { Container } from '@mui/material';
import Head from 'next/head';
import { FC } from 'react';
import CustomBreadcrumbs, { CustomBreadcrumbsProps } from '../custom-breadcrumbs';
import { useSettingsContext } from '../settings';

interface DashboardTemplateProps extends CustomBreadcrumbsProps {
  documentTitle?: string;
  children: React.ReactNode;
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
        <title>{documentTitle || 'Dashboard | Scientech'}</title>
      </Head>

      <Container maxWidth={themeStretch ? false : 'lg'}>
        <CustomBreadcrumbs {...customBreadcrumbsProps} />

        {children}
      </Container>
    </>
  );
};

export default DashboardTemplate;
