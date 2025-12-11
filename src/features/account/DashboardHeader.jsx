import { FiUser, FiBell } from 'react-icons/fi';

export default function DashboardHeader({ user }) {
  return (
    <header className='sticky top-0 z-20 flex items-center justify-between gap-4 border-b border-slate-200 bg-white px-6 py-4'>
      <div className='space-y-1'>
        <div>
          <h1 className='text-xl font-semibold text-slate-900'>NCDC Management System</h1>
          <p className='text-sm text-slate-500'>Screening, follow-up, and community engagement</p>
        </div>
      </div>
      <div className='flex items-center gap-3'>
        <div className='hidden sm:flex items-center gap-2 rounded border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-medium text-slate-600'>
          <span className='w-2 h-2 rounded-full bg-emerald-500'></span>
          Online
        </div>
        <div className='flex items-center gap-2 rounded border border-slate-200 bg-white px-3 py-2 text-xs font-medium text-slate-700'>
          <FiBell className='h-4 w-4 text-slate-500' />
          Updates
        </div>
        <div className='flex items-center gap-3 rounded border border-slate-200 bg-white px-3 py-2 cursor-pointer hover:bg-slate-50 transition-colors'>
          <div className='flex h-9 w-9 items-center justify-center rounded bg-sky-600 text-white'>
            <FiUser className='h-4 w-4' />
          </div>
          <div className='leading-tight'>
            <p className='text-sm font-medium text-slate-900'>{user.name}</p>
            <p className='text-xs text-slate-500'>{user.role}</p>
          </div>
        </div>
      </div>
    </header>
  );
}
