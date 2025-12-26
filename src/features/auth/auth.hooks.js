import { useQuery, useQueryClient } from '@tanstack/react-query';

export const useUser = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ['user'],
    queryFn: () => null,
    enabled: false,
    staleTime: Infinity,
    gcTime: Infinity,
  });

  // data will contain { token, user } as set in your login mutation
  return { user: data?.user, token: data?.token, isLoading, error };
};
export const useAuth = () => {
  const queryClient = useQueryClient();
  const user = queryClient.getQueryData(['user']);

  const isAdmin = () => {
    const userData = user?.user;
    if (!userData) return false;

    // Check if roles is an array and includes 'admin'
    if (Array.isArray(userData.roles)) {
      return userData.roles.some((role) => role?.toLowerCase() === 'admin');
    }

    // Fallback to single role string
    return userData.role?.toLowerCase() === 'admin';
  };

  const isAdmissionStaff = () => {
    const userData = user?.user;
    if (!userData) return false;

    // Check if roles is an array and includes 'admission staff'
    if (Array.isArray(userData.roles)) {
      return userData.roles.some((role) => role?.toLowerCase() === 'admission staff');
    }

    // Fallback to single role string
    return userData.role?.toLowerCase() === 'admission staff';
  };

  const isScreeningVolunteer = () => {
    const userData = user?.user;
    if (!userData) return false;

    // Check if roles is an array and includes 'screening volunteer'
    if (Array.isArray(userData.roles)) {
      return userData.roles.some((role) => role?.toLowerCase() === 'screening volunteer');
    }

    // Fallback to single role string
    return userData.role?.toLowerCase() === 'screening volunteer';
  };

  return {
    user: user?.user,
    token: user?.token,
    isAdmin: isAdmin(),
    isAdmissionStaff: isAdmissionStaff(),
    isScreeningVolunteer: isScreeningVolunteer(),
  };
};
