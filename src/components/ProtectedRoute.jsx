import { Navigate } from 'react-router-dom';
import { useUser } from '../features/auth/auth.hooks';
// import LoadingSpinner from '../ui/LoadingSpinner';

const ProtectedRoute = ({ children }) => {
  const user = useUser();

  if (!user || !user.token) {
    return <Navigate to='/login' replace />;
  }

  return children;
};

export default ProtectedRoute;
