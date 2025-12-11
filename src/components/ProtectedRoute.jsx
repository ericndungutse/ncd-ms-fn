import { Navigate } from 'react-router-dom';
import { useUser } from '../features/auth/auth.queries';
import LoadingSpinner from '../ui/LoadingSpinner';

const ProtectedRoute = ({ children }) => {
  const { user, isLoading, isError } = useUser();

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (isError || !user) {
    return <Navigate to='/' replace />;
  }

  return children;
};

export default ProtectedRoute;
