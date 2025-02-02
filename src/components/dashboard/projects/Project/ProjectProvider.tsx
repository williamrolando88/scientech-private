import { Project } from '@src/types/projects';
import { createContext, FC, ReactNode, useMemo } from 'react';

interface Context {
  project: Project;
}

export const ProjectContext = createContext<Context>({} as Context);

interface Props {
  project: Project;
  children: ReactNode;
}

export const ProjectProvider: FC<Props> = ({ children, project }) => {
  const contextValues = useMemo(() => ({ project }), [project]);

  return (
    <ProjectContext.Provider value={contextValues}>
      {children}
    </ProjectContext.Provider>
  );
};
