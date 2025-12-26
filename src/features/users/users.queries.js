import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { getUsers, registerUser } from '../../service/users.service';
import { getErrorMessage, getResponseData } from '../../utils/axios.utils';

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

export function useRegisterUser() {
  const queryClient = useQueryClient();

  const {
    isPending,
    mutate: registerUserMutation,
    error,
  } = useMutation({
    mutationFn: (userData) => registerUser(userData),

    onSuccess: (response) => {
      const { message } = getResponseData(response);

      // Invalidate users query to refetch the list
      queryClient.invalidateQueries({ queryKey: ['users'] });

      // Show success message
      toast.success(message || 'User registered successfully!');
    },

    onError: (error) => {
      // Check if error has field-specific validation errors
      const errorData = error?.response?.data;

      if (errorData?.errors) {
        // Don't show toast for field-specific errors, they'll be displayed on fields
        return;
      }

      // Show generic error message
      toast.error(getErrorMessage(error));
    },
  });

  return { isPending, registerUserMutation, error };
}
