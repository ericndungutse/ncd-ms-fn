import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { loginApi } from '../../service/auth.service';
import { getErrorMessage, getResponseData } from '../../utils/axios.utils';

export function useLogin() {
  // const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { isPending, mutate: login } = useMutation({
    mutationFn: ({ email, password }) => loginApi({ email, password }),

    onSuccess: (response) => {
      const {
        message,
        data: { token, user },
      } = getResponseData(response);
      queryClient.setQueryData(['user'], { token: token, user: user });
      // navigate('/dashboard', { replace: true });
      toast.success(message);
    },

    onError: (error) => {
      toast.error(getErrorMessage(error));
    },
  });

  return { isPending, login };
}
