import { COLLECTIONS } from '@src/lib/enums/collections';
import { Projects } from '@src/services/firebase/projects';
import { Client } from '@src/types/clients';
import { Project } from '@src/types/projects';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

const queryKey = [COLLECTIONS.PROJECTS];

export const useListProjects = () => {
  const query = useQuery<Project[]>({
    queryKey,
    queryFn: Projects.list,
  });

  return { ...query, data: query.data ?? [] };
};

export const useAddProject = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: Projects.upsert,
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey });
    },
    onSuccess: (_, inputs) => {
      queryClient.setQueryData(queryKey, (prevData: Project[]) => [
        ...prevData,
        inputs,
      ]);
    },
  });

  return mutation;
};

export const useDeleteProject = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: Projects.remove,
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey });
    },
    onSuccess: (_, id) => {
      queryClient.setQueryData(queryKey, (prevData: Project[]) =>
        prevData.filter((project) => String(project.id) !== id)
      );
    },
  });

  return mutation;
};

export const useUpdateProject = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: Projects.upsert,
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey });
    },
    onSuccess: (id, input) => {
      queryClient.setQueryData(queryKey, (prevData: Client[]) =>
        prevData.map((project) => (project.id === id ? input : project))
      );
    },
  });

  return mutation;
};
