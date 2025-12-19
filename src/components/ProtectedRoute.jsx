import { Navigate } from 'react-router-dom';
// import LoadingSpinner from '../ui/LoadingSpinner';

const ProtectedRoute = ({ children }) => {
  // if (isLoading) {
  //   return <LoadingSpinner />;
  // }

  // if (isError || !user) {
  //   return <Navigate to='/' replace />;
  // }

  return children;
};

export default ProtectedRoute;
