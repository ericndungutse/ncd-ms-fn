import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { loginApi } from '../../service/auth.service';
import getErrorMessage from '../../utils/getAxiosErrorMessage';

export function useLogin() {
  // const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { isPending, mutate: login } = useMutation({
    mutationFn: ({ email, password }) => loginApi({ email, password }),

    onSuccess: (user) => {
      queryClient.setQueryData(['user'], user.user);
      // navigate('/dashboard', { replace: true });
    },

    onError: (error) => {
      toast.error(getErrorMessage(error));
    },
  });

  return { isPending, login };
}
