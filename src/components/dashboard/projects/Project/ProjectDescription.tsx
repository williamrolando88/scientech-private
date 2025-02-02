import { Card } from '@mui/material';
import { useProjectContext } from '@src/hooks/useProjectContext';
import { FC } from 'react';

const ProjectDescription: FC = () => {
  const { project } = useProjectContext();

  return (
    <Card sx={{ p: 2 }}>
      <code>{JSON.stringify(project, null, 2)}</code>
    </Card>
  );
};

export default ProjectDescription;
