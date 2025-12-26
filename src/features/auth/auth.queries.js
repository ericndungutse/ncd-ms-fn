import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { loginApi } from '../../service/auth.service';
import { getResponseData } from '../../utils/axios.utils';
import { useNavigate } from 'react-router-dom';

export function useLogin() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const {
    isPending,
    mutate: login,
    error,
  } = useMutation({
    mutationFn: ({ email, password }) => loginApi({ email, password }),

    onSuccess: (response) => {
      const {
        message,
        data: { token, user },
      } = getResponseData(response);

      // 1. Set the data (only 2 arguments)
      queryClient.setQueryData(['user'], { token, user });

      // 2. Set the behavior defaults for this specific key
      queryClient.setQueryDefaults(['user'], {
        staleTime: Infinity,
        gcTime: Infinity, // This prevents it from being deleted after 5 mins
      });

      navigate('/dashboard', { replace: true });
      toast.success(message);
    },
  });

  return { isPending, login, error };
}
