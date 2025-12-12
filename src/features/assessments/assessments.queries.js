import { useQuery } from '@tanstack/react-query';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { getAssessments, getProfileByPatientNumber, createAssessment } from '../../service/assessments.service';
import { getErrorMessage } from '../../utils/axios.utils';
import { getResponseData } from '../../utils/axios.utils';

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

export function useFetchProfileByPatientNumber(patientNumber, options = {}) {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ['profile', patientNumber],
    queryFn: () => getProfileByPatientNumber(patientNumber),
    enabled: !!patientNumber && patientNumber.length > 0,
    retry: false,
    ...options,
  });

  return {
    profile: data?.data?.data || null,
    isLoading,
    error: error ? getErrorMessage(error) : null,
    refetch,
  };
}

export function useCreateAssessment() {
  const queryClient = useQueryClient();

  const {
    isPending,
    mutate: createAssessmentMutation,
    error,
  } = useMutation({
    mutationFn: (assessmentData) => createAssessment(assessmentData),

    onSuccess: (response) => {
      const { message } = getResponseData(response);

      // Invalidate assessments query to refetch the list
      queryClient.invalidateQueries({ queryKey: ['assessments'] });

      // Show success message
      toast.success(message || 'Assessment recorded successfully!');
    },

    onError: (error) => {
      // Check if error has field-specific validation errors
      const errorData = error?.response?.data;

      if (errorData?.errors) {
        // Don't show toast for field-specific errors, they'll be displayed on fields
        return;
      }

      // Show general error message
      toast.error(getErrorMessage(error));
    },
  });

  return {
    createAssessment: createAssessmentMutation,
    isPending,
    error: error ? getErrorMessage(error) : null,
  };
}
