import { Outlet } from 'react-router-dom';
import Sidebar from '../features/account/Sidebar';

import DashboardHeader from '../features/account/DashboardHeader';

export default function Account() {
  return (
    <div className='app-shell flex min-h-screen'>
      <Sidebar />

      {/* Main content */}
      <main className='flex-1 min-w-0 flex flex-col relative'>
        <DashboardHeader />

        <div className='flex-1 px-4 py-8 sm:px-8 lg:px-12 animate-fade-in'>
          <div className='max-w-6xl 2xl:max-w-7xl mx-auto w-full space-y-6'>
            <Outlet />
          </div>
        </div>
      </main>
    </div>
  );
}
