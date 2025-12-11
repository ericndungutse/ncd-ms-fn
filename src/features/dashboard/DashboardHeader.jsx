import { FiUser } from 'react-icons/fi';

export default function DashboardHeader({ user }) {
  return (
    <header className='sticky top-0 z-20 flex items-center justify-between border-b border-slate-200 bg-white/95 px-6 py-4 backdrop-blur'>
      <div>
        <h1 className='text-2xl font-semibold text-slate-900'>NCDC Management System</h1>
        <p className='text-sm text-slate-500'>Non-Communicable Disease Care Services</p>
      </div>
      <div className='flex items-center gap-3'>
        <div className='flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-2'>
          <div className='flex h-9 w-9 items-center justify-center rounded-full bg-emerald-50 text-emerald-700 ring-1 ring-emerald-100'>
            <FiUser />
          </div>
          <div className='leading-tight'>
            <p className='text-sm font-semibold text-slate-900'>{user.name}</p>
            <p className='text-xs text-slate-500'>{user.role}</p>
          </div>
        </div>
      </div>
    </header>
  );
}
