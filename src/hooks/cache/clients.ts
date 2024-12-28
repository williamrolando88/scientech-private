import { COLLECTIONS_ENUM } from '@src/lib/enums/collections';
import { Clients } from '@src/services/firestore/clients';
import { Client } from '@src/types/clients';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

const queryKey = [COLLECTIONS_ENUM.CLIENTS];

export const useListClients = () => {
  const query = useQuery<Client[]>({
    queryKey,
    queryFn: Clients.list,
  });

  return { ...query, data: query.data ?? [] };
};

export const useAddClient = () => {
  const queryClient = useQueryClient();

  return useMutation({
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
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey });
    },
  });
};

export const useUpdateClient = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: Clients.upsert,
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey });
    },
    onSuccess: (id, inputs) => {
      queryClient.setQueryData(queryKey, (prevData: Client[]) =>
        prevData.map((client) => (client.id === id ? inputs : client))
      );
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey });
    },
  });
};

export const useDeleteClient = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: Clients.remove,
    onMutate: async (id: string) => {
      await queryClient.cancelQueries({ queryKey });
    },
    onSuccess: (_, id) => {
      queryClient.setQueryData(queryKey, (prevData: Client[]) =>
        prevData.filter((client) => client.id !== id)
      );
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey });
    },
  });
};
