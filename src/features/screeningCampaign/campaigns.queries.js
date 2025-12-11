import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { getCampaigns, createCampaign } from '../../service/campaigns.service';
import { getErrorMessage, getResponseData } from '../../utils/axios.utils';

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

export function useCreateCampaign() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const {
    isPending,
    mutate: createCampaignMutation,
    error,
  } = useMutation({
    mutationFn: (campaignData) => createCampaign(campaignData),

    onSuccess: (response) => {
      const { message } = getResponseData(response);

      // Invalidate campaigns query to refetch the list
      queryClient.invalidateQueries({ queryKey: ['campaigns'] });

      // Navigate back to campaigns list
      navigate('/campaigns', { replace: true });

      // Show success message
      toast.success(message || 'Campaign created successfully!');
    },

    onError: (error) => {
      const errorMessage = getErrorMessage(error);
      toast.error(errorMessage || 'Failed to create campaign');
    },
  });

  return { isPending, createCampaignMutation, error };
}
