import { useQuery } from '@tanstack/react-query';
import { getAssessments } from '../../service/assessments.service';
import { getErrorMessage } from '../../utils/axios.utils';

export function useFetchAssessments(params = {}) {
  const { data, isLoading, error, refetch, isFetching } = useQuery({
    queryKey: ['assessments', params],
    queryFn: () => getAssessments(params),
  });

  return {
    data: data?.data?.data?.assessments || [],
    isLoading,
    isFetching,
    error: error ? getErrorMessage(error) : null,
    refetch,
  };
}
