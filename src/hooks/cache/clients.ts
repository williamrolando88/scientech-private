import { COLLECTIONS } from '@src/lib/enums/collections';
import { Clients } from '@src/services/firebase/clients';
import { Client } from '@src/types/clients';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

const queryKey = [COLLECTIONS.CLIENTS];

export const useListClients = () => {
  const query = useQuery<Client[]>({
    queryKey,
    queryFn: Clients.list,
  });

  return { ...query, data: query.data ?? [] };
};

export const useAddClient = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: Clients.upsert,
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey });
    },
    onSuccess: (_, inputs) => {
      queryClient.setQueryData(queryKey, (prevData: Client[]) => [
        ...prevData,
        inputs,
      ]);
    },
  });

  return mutation;
};

export const useDeleteClient = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: Clients.remove,
    onMutate: async (id: string) => {
      await queryClient.cancelQueries({ queryKey });
    },
    onSuccess: (_, id) => {
      queryClient.setQueryData(queryKey, (prevData: Client[]) =>
        prevData.filter((client) => client.id !== id)
      );
    },
  });

  return mutation;
};

export const useUpdateClient = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: Clients.upsert,
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey });
    },
    onSuccess: (id, input) => {
      queryClient.setQueryData(queryKey, (prevData: Client[]) =>
        prevData.map((client) => (client.id === id ? input : client))
      );
    },
  });

  return mutation;
};
