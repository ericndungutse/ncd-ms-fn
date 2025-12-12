import { useQuery } from '@tanstack/react-query';
import { getUsers } from '../../service/users.service';
import { getErrorMessage } from '../../utils/axios.utils';

export function useFetchUsers(params = {}) {
  const { data, isLoading, error, refetch, isFetching } = useQuery({
    queryKey: ['users', params],
    queryFn: () => getUsers(params),
  });

  return {
    data: data?.data?.data || { users: [], pagination: null },
    isLoading,
    isFetching,
    error: error ? getErrorMessage(error) : null,
    refetch,
  };
}
