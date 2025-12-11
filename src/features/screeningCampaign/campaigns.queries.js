import { useQuery } from '@tanstack/react-query';
import { getCampaigns } from '../../service/campaigns.service';
import { getErrorMessage } from '../../utils/axios.utils';

export function useFetchCampaigns() {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ['campaigns'],
    queryFn: getCampaigns,
  });

  return {
    data: data || [],
    isLoading,
    error: error ? getErrorMessage(error) : null,
    refetch,
  };
}
