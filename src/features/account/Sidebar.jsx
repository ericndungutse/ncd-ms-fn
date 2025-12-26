import { useState } from 'react';
import { FiActivity, FiDatabase, FiLogOut, FiMapPin, FiUsers } from 'react-icons/fi';
import { RiDashboard2Line } from 'react-icons/ri';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';
import RequireRole from '../../ui/RequireRole';

export default function Sidebar() {
  const [sidebarOpen] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();
  const queryClient = useQueryClient();

  const handleLogout = () => {
    queryClient.clear();
    navigate('/login', { replace: true });
  };

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
        <Link
          to='/dashboard'
          aria-current={isActive('/dashboard') ? 'page' : undefined}
          className={`group relative flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
            isActive('/dashboard') ? 'bg-sky-50 text-sky-700' : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
          }`}
          title={!sidebarOpen ? 'Dashboard' : ''}
        >
          {isActive('/dashboard') && (
            <span className='absolute left-0 top-2 bottom-2 w-1 rounded-full bg-sky-600'></span>
          )}
          <div
            className={`p-1.5 rounded transition-colors ${
              isActive('/dashboard') ? 'bg-sky-100 text-sky-700' : 'text-slate-500 group-hover:text-slate-700'
            }`}
          >
            <RiDashboard2Line className='h-5 w-5 shrink-0' />
          </div>
          {sidebarOpen && <span>Dashboard</span>}
        </Link>

        <RequireRole allowedRoles={['admin']}>
          <Link
            to='/assessments'
            aria-current={isActive('/assessments') ? 'page' : undefined}
            className={`group relative flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
              isActive('/assessments')
                ? 'bg-sky-50 text-sky-700'
                : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
            }`}
            title={!sidebarOpen ? 'Assessments' : ''}
          >
            {isActive('/assessments') && (
              <span className='absolute left-0 top-2 bottom-2 w-1 rounded-full bg-sky-600'></span>
            )}
            <div
              className={`p-1.5 rounded transition-colors ${
                isActive('/assessments') ? 'bg-sky-100 text-sky-700' : 'text-slate-500 group-hover:text-slate-700'
              }`}
            >
              <FiActivity className='h-5 w-5 shrink-0' />
            </div>
            {sidebarOpen && <span>Assessments</span>}
          </Link>
        </RequireRole>

        <Link
          to='/campaigns'
          aria-current={isActive('/campaigns') ? 'page' : undefined}
          className={`group relative flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
            isActive('/campaigns') ? 'bg-sky-50 text-sky-700' : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
          }`}
          title={!sidebarOpen ? 'Campaigns' : ''}
        >
          {isActive('/campaigns') && (
            <span className='absolute left-0 top-2 bottom-2 w-1 rounded-full bg-sky-600'></span>
          )}
          <div
            className={`p-1.5 rounded transition-colors ${
              isActive('/campaigns') ? 'bg-sky-100 text-sky-700' : 'text-slate-500 group-hover:text-slate-700'
            }`}
          >
            <FiMapPin className='h-5 w-5 shrink-0' />
          </div>
          {sidebarOpen && <span>Campaigns</span>}
        </Link>

        <Link
          to='/indicators'
          aria-current={isActive('/indicators') ? 'page' : undefined}
          className={`group relative flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
            isActive('/indicators') ? 'bg-sky-50 text-sky-700' : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
          }`}
          title={!sidebarOpen ? 'Indicators' : ''}
        >
          {isActive('/indicators') && (
            <span className='absolute left-0 top-2 bottom-2 w-1 rounded-full bg-sky-600'></span>
          )}
          <div
            className={`p-1.5 rounded transition-colors ${
              isActive('/indicators') ? 'bg-sky-100 text-sky-700' : 'text-slate-500 group-hover:text-slate-700'
            }`}
          >
            <FiDatabase className='h-5 w-5 shrink-0' />
          </div>
          {sidebarOpen && <span>Indicators</span>}
        </Link>

        <RequireRole allowedRoles={['admin']}>
          <Link
            to='/users'
            aria-current={isActive('/users') ? 'page' : undefined}
            className={`group relative flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
              isActive('/users') ? 'bg-sky-50 text-sky-700' : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
            }`}
            title={!sidebarOpen ? 'Users' : ''}
          >
            {isActive('/users') && <span className='absolute left-0 top-2 bottom-2 w-1 rounded-full bg-sky-600'></span>}
            <div
              className={`p-1.5 rounded transition-colors ${
                isActive('/users') ? 'bg-sky-100 text-sky-700' : 'text-slate-500 group-hover:text-slate-700'
              }`}
            >
              <FiUsers className='h-5 w-5 shrink-0' />
            </div>
            {sidebarOpen && <span>Users</span>}
          </Link>
        </RequireRole>
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
