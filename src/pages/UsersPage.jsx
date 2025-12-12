import { Link } from 'react-router-dom';
import { FiPlus } from 'react-icons/fi';
import { UsersList } from '../features/users';

export default function UsersPage() {
  return (
    <div className='space-y-8 max-w-[1600px] mx-auto'>
      <div className='surface-card p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white border border-slate-200 rounded-lg shadow-sm'>
        <div>
          <h1 className='text-2xl font-semibold text-slate-900 mb-1'>Users Management</h1>
          <p className='text-slate-600 text-sm'>View and manage system users</p>
        </div>

        <Link
          to='/users/register'
          className='inline-flex items-center gap-2 rounded border border-sky-600 bg-sky-600 px-4 py-2 text-white font-medium hover:bg-sky-700 transition-colors'
        >
          <FiPlus className='h-4 w-4' />
          Register User
        </Link>
      </div>

      <UsersList />
    </div>
  );
}
