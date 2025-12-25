import { useAuth } from '../features/auth/auth.hooks';

export default function RequireRole({ allowedRoles, fallback = null, children }) {
  const { user } = useAuth();

  const hasAccess = user && Array.isArray(user.roles) && allowedRoles.some((role) => user.roles.includes(role));

  if (!hasAccess) {
    return fallback;
  }

  return children;
}
