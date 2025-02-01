import ProjectBasePage from '@src/components/dashboard/projects/Project/ProjectBasePage';
import { useDocumentSnapshot } from '@src/hooks/useDocumentSnapshot';
import { COLLECTIONS } from '@src/services/firestore/collections';
import { Project } from '@src/types/projects';
import { useRouter } from 'next/router';
import DashboardLayout from 'src/components/shared/layouts/dashboard/DashboardLayout';
import DashboardTemplate from 'src/components/shared/layouts/dashboard/DashboardTemplate';

Page.getLayout = (page: React.ReactElement) => (
  <DashboardLayout>{page}</DashboardLayout>
);

export default function Page() {
  const {
    query: { id },
  } = useRouter();
  const processedId = Array.isArray(id) ? id.join('') : id;
  const projectData = useDocumentSnapshot<Project>({
    id: processedId ?? '',
    collection: COLLECTIONS.PROJECTS,
  });

  const title = `Proyecto ${projectData?.number ? `#${projectData?.number}` : 'Desconocido'}`;
  return (
    <DashboardTemplate documentTitle={title} heading={title}>
      <ProjectBasePage project={projectData} />
    </DashboardTemplate>
  );
}
