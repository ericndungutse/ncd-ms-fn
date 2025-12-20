import { useState } from 'react';
import { FiActivity, FiDatabase, FiLogOut, FiMapPin, FiUsers, FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { RiDashboard2Line } from 'react-icons/ri';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../auth/auth.hooks';
import { useQueryClient } from '@tanstack/react-query';

export default function Sidebar() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();
  const { isAdmin } = useAuth();
  const queryClient = useQueryClient();

  const handleLogout = () => {
    queryClient.clear();
    navigate('/login', { replace: true });
  };

  const navItems = [
    { path: '/dashboard', label: 'Dashboard', icon: RiDashboard2Line, show: true },
    { path: '/assessments', label: 'Assessments', icon: FiActivity, show: isAdmin },
    // { path: '/assessments/record', label: 'Record Assessment', icon: FiActivity, show: true },
    { path: '/campaigns', label: 'Campaigns', icon: FiMapPin, show: true },
    // { path: '/campaigns/create', label: 'Create Campaign', icon: FiMapPin, show: true },
    { path: '/indicators', label: 'Indicators', icon: FiDatabase, show: true },
    { path: '/users', label: 'Users', icon: FiUsers, show: isAdmin },
  ];

  const visibleNavItems = navItems.filter((item) => item.show);

  const isActive = (path) => {
    return location.pathname === path || location.pathname.startsWith(path + '/');
  };
  return (
    <aside
      className={`${
        sidebarOpen ? 'w-48' : 'w-20'
      } sticky top-0 h-screen flex-col gap-6 overflow-y-auto border-r border-slate-200 bg-white transition-all duration-300 flex`}
    >
      <div className='flex items-center p-5'>
        <Link to='/dashboard' className='flex items-center gap-2 group'>
          {sidebarOpen ? (
            <div className='flex items-center gap-3'>
              <div className='w-9 h-9 bg-sky-600 rounded-lg flex items-center justify-center text-white font-semibold text-sm'>
                eR
              </div>
              <div>
                <h1 className='text-lg font-semibold text-slate-900 tracking-tight'>eRINDE AI</h1>
                {/* <p className='text-xs text-slate-500 leading-tight'>Management System</p> */}
              </div>
            </div>
          ) : (
            <div className='w-9 h-9 bg-sky-600 rounded-lg flex items-center justify-center text-white font-semibold text-xs'>
              eR
            </div>
          )}
        </Link>
      </div>

      <nav className='flex-1 space-y-1 px-3'>
        {visibleNavItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            aria-current={isActive(item.path) ? 'page' : undefined}
            className={`group relative flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
              isActive(item.path) ? 'bg-sky-50 text-sky-700' : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
            }`}
            title={!sidebarOpen ? item.label : ''}
          >
            {isActive(item.path) && (
              <span className='absolute left-0 top-2 bottom-2 w-1 rounded-full bg-sky-600'></span>
            )}
            <div
              className={`p-1.5 rounded transition-colors ${
                isActive(item.path) ? 'bg-sky-100 text-sky-700' : 'text-slate-500 group-hover:text-slate-700'
              }`}
            >
              <item.icon className='h-5 w-5 shrink-0' />
            </div>
            {sidebarOpen && <span className='transition-colors'>{item.label}</span>}
          </Link>
        ))}
      </nav>

      <div className='space-y-3 border-t border-slate-100 p-3'>
        {sidebarOpen && (
          <div className='text-xs px-3 py-2 rounded-lg bg-slate-50 border border-slate-100'>
            <p className='font-semibold text-slate-900'>Healthy communities</p>
            <p className='text-slate-500 capitalize'>NCDC screening toolkit</p>
          </div>
        )}
        <button
          onClick={handleLogout}
          className={`group flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition-colors ${
            !sidebarOpen ? 'justify-center' : ''
          }`}
          title={!sidebarOpen ? 'Logout' : ''}
        >
          <div className='p-1.5 rounded transition-colors'>
            <FiLogOut className='h-5 w-5 shrink-0' />
          </div>
          {sidebarOpen && <span>Log Out</span>}
        </button>
      </div>
    </aside>
  );
}
