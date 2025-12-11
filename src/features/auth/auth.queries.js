import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
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
      localStorage.setItem('token', token);
      queryClient.setQueryData(['user'], { token: token, user: user });
      navigate('/dashboard', { replace: true });
      toast.success(message);
    },
  });

  return { isPending, login, error };
}

export function useUser() {
  // read token from localStorage safely
  let token = null;
  try {
    token = localStorage.getItem('token');
  } catch (e) {
    console.log(e);

    token = null;
  }

  const { data, isLoading, isError } = useQuery({
    queryKey: ['user'],
    queryFn: async () => {
      if (!token) throw new Error('no-token');
      const result = {};
      // getMe returns { user, token }
      return result;
    },
    enabled: !!token,
    retry: false,
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 5,
  });

  return {
    user: data ? { user: data.user, token: data.token } : null,
    token: data?.token || token,
    isLoading,
    isError,
  };
}
