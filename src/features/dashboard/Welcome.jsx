import { useAuth } from '../auth/auth.hooks';

export default function Welcome() {
  const { user } = useAuth();
  return (
    <div>
      <h1 className='text-3xl font-bold text-slate-900'>Welcome back{user?.firstName ? `, ${user.firstName}` : ''}</h1>
      <p className='text-slate-600 mt-1'>Here's what's happening with your healthcare system today</p>
    </div>
  );
}
