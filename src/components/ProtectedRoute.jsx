import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/useAuth';

export default function ProtectedRoute({ children, requiredRoles = null }) {
  const { isAuthenticated, hasRole, loading } = useAuth();

  if (loading) {
    return (
      <div className='flex min-h-screen items-center justify-center bg-slate-50'>
        <div className='text-center'>
          <div className='h-12 w-12 animate-spin rounded-full border-4 border-slate-200 border-t-emerald-600 mx-auto'></div>
          <p className='mt-4 text-slate-600'>Loading...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to='/dashboard' replace />;
  }

  if (requiredRoles && !hasRole(requiredRoles)) {
    return <Navigate to='/dashboard' replace />;
  }

  return children;
}
