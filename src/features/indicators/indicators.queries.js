import { useQuery } from '@tanstack/react-query';
import { getIndicators } from '../../service/indicators.service';
import { getErrorMessage } from '../../utils/axios.utils';

export function useFetchIndicators() {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ['indicators'],
    queryFn: () => getIndicators(),
  });

  return {
    data: data?.data?.data?.indicators || [],
    isLoading,
    error: error ? getErrorMessage(error) : null,
    refetch,
  };
}
