import { useListProjects } from '@src/hooks/cache/projects';
import { PROJECTS_INITIAL_VALUE } from '@src/lib/constants/projects';
import { Project } from '@src/types/projects';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import DashboardLayout from 'src/components/shared/layouts/dashboard/DashboardLayout';
import DashboardTemplate from 'src/components/shared/layouts/dashboard/DashboardTemplate';

Page.getLayout = (page: React.ReactElement) => (
  <DashboardLayout>{page}</DashboardLayout>
);

export default function Page() {
  const {
    query: { id },
  } = useRouter();
  const { data: projects } = useListProjects();
  const [currentProject, setCurrentProject] = useState<Project>(
    PROJECTS_INITIAL_VALUE
  );

  useEffect(() => {
    const project = projects?.find(
      (storedProject) => String(storedProject.id) === id
    );
    setCurrentProject(project ?? PROJECTS_INITIAL_VALUE);
  }, [id, projects]);

  return (
    <DashboardTemplate
      documentTitle={`Proyecto ${currentProject?.name ?? ''}`}
      heading={currentProject?.name ?? 'Proyecto'}
    >
      Proyecto
    </DashboardTemplate>
  );
}
