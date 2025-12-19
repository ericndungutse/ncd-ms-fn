import { useQueryClient } from '@tanstack/react-query';

export const useUser = () => {
  const queryClient = useQueryClient();

  // Attempt to get the cached 'user' query
  const user = queryClient.getQueryData(['user']);

  console.log('Fetched user from cache:', user);

  return user;
};
