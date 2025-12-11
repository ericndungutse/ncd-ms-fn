import { Outlet } from 'react-router-dom';
import Sidebar from '../features/account/Sidebar';

import DashboardHeader from '../features/account/DashboardHeader';

export default function Account() {
  const user = {
    name: 'Health Worker',
    role: 'NCDC Volunteer',
  };

  return (
    <div className='flex min-h-screen bg-slate-50 text-slate-900'>
      <Sidebar />

      {/* Main content */}
      <main className='flex-1 min-w-0'>
        <DashboardHeader user={user} />

        <div className='space-y-6 px-4 py-6 sm:px-6 lg:px-8'>
          <Outlet />
        </div>
      </main>
    </div>
  );
}
