import {
  useInfiniteQuery,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';
import { makeApiCall } from './client';
import { PaginationRequest } from './client/paginations';

export const CreateOrUpdateOneProjectAPI = ({
  onSuccess,
  onError,
}: {
  onSuccess?: () => void;
  onError?: (error: any) => void;
} = {}) => {
  const queryKey = ['projects'];
  const queryClient = useQueryClient();
  const result = useMutation({
    mutationKey: queryKey,
    mutationFn: async (payload: any & { projectId: string }) => {
      const { projectId } = payload;
      return projectId
        ? await makeApiCall({
            action: 'updateOneProject',
            body: payload,
            urlParams: { projectId },
          })
        : await makeApiCall({
            action: 'createOneProject',
            body: { ...payload },
          });
    },
    onError: async (error) => {
      await queryClient.invalidateQueries({ queryKey });
      if (onError) {
        onError(error);
      }
    },
    onSettled: async () => {
      await queryClient.invalidateQueries({ queryKey });
      if (onSuccess) {
        onSuccess();
      }
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey });
      if (onSuccess) {
        onSuccess();
      }
    },
  });

  return result;
};

export const GetInfiniteProjectsAPI = (
  payload: {
    search?: string;
    take: number;
    status?: string;
  } & PaginationRequest,
) => {
  const { take, sort, search, status, sortBy } = payload;
  return useInfiniteQuery({
    queryKey: ['projects', 'infinite', { ...payload }],
    getNextPageParam: (lastPage: any) => lastPage.data.next_page,
    queryFn: async ({ pageParam = 1 }) =>
      await makeApiCall({
        action: 'getProjects',
        queryParams: {
          take,
          sort,
          search,
          status,
          sortBy,
          page: pageParam,
        },
      }),
    staleTime: 60_000,
    initialPageParam: 1,
  });
};

export const DeleteOneProjectAPI = ({
  onSuccess,
  onError,
}: {
  onSuccess?: () => void;
  onError?: (error: any) => void;
} = {}) => {
  const queryKey = ['projects'];
  const queryClient = useQueryClient();
  const result = useMutation({
    mutationKey: queryKey,
    mutationFn: async (payload: { projectId: string }) => {
      const { projectId } = payload;
      return await makeApiCall({
        action: 'deleteOneProject',
        urlParams: { projectId },
      });
    },
    onError: async (error) => {
      await queryClient.invalidateQueries({ queryKey });
      if (onError) {
        onError(error);
      }
    },
    onSettled: async () => {
      await queryClient.invalidateQueries({ queryKey });
      if (onSuccess) {
        onSuccess();
      }
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey });
      if (onSuccess) {
        onSuccess();
      }
    },
  });

  return result;
};
