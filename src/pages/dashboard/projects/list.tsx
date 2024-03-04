import AddProject from '@src/components/dashboard/projects/AddProject';
import ProjectIndex from '@src/components/dashboard/projects/ProjectIndex';
import DashboardLayout from 'src/components/shared/layouts/dashboard/DashboardLayout';
import DashboardTemplate from 'src/components/shared/layouts/dashboard/DashboardTemplate';

Page.getLayout = (page: React.ReactElement) => (
  <DashboardLayout>{page}</DashboardLayout>
);

export default function Page() {
  return (
    <DashboardTemplate
      documentTitle="Proyectos"
      heading="Proyectos"
      action={<AddProject />}
    >
      <ProjectIndex />
    </DashboardTemplate>
  );
}
