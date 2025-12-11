import { useState } from 'react';
import { FiActivity, FiDatabase, FiLogOut, FiMapPin, FiMenu, FiX } from 'react-icons/fi';
import { RiDashboard2Line } from 'react-icons/ri';
import { Link, useLocation, useNavigate } from 'react-router-dom';

export default function Sidebar() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();
  const handleLogout = () => {
    navigate('/login', { replace: true });
  };

  const navItems = [
    { path: '/dashboard', label: 'Dashboard', icon: RiDashboard2Line, show: true },
    { path: '/assessments', label: 'Assessments', icon: FiActivity, show: true },
    { path: '/assessments/record', label: 'Record Assessment', icon: FiActivity, show: true },
    { path: '/campaigns', label: 'Campaigns', icon: FiMapPin, show: true },
    { path: '/campaigns/create', label: 'Create Campaign', icon: FiMapPin, show: true },
    { path: '/indicators', label: 'Indicators', icon: FiDatabase, show: true },
  ];

  const visibleNavItems = navItems.filter((item) => item.show);

  const isActive = (path) => {
    return location.pathname === path || location.pathname.startsWith(path + '/');
  };
  return (
    <aside
      className={`${
        sidebarOpen ? 'w-64' : 'w-20'
      } sticky top-0 h-screen flex-col gap-6 overflow-y-auto border-r border-slate-200 bg-white p-6 transition-all duration-300 flex`}
    >
      <div className='flex items-center justify-between'>
        <Link to='/overview' className='flex items-center gap-2'>
          {sidebarOpen && <h1 className='text-xl font-bold text-slate-900'>NCDC MS</h1>}
        </Link>
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className='rounded-lg p-2 hover:bg-slate-100'
          aria-label='Toggle sidebar'
        >
          {sidebarOpen ? <FiX className='h-5 w-5' /> : <FiMenu className='h-5 w-5' />}
        </button>
      </div>

      <nav className='flex-1 space-y-2'>
        {visibleNavItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-semibold transition ${
              isActive(item.path)
                ? 'bg-emerald-50 text-emerald-700 ring-1 ring-emerald-100'
                : 'text-slate-600 hover:bg-slate-50'
            }`}
            title={!sidebarOpen ? item.label : ''}
          >
            <item.icon className='h-5 w-5 shrink-0' />
            {sidebarOpen && <span>{item.label}</span>}
          </Link>
        ))}
      </nav>

      <div className='space-y-3 border-t border-slate-100 pt-4'>
        {sidebarOpen && (
          <div className='text-xs'>
            {/* <p className='font-semibold text-slate-900'>{user?.profile?.firstName}</p>
                 <p className='text-slate-500 capitalize'>{user?.role}</p> */}
          </div>
        )}
        <button
          onClick={handleLogout}
          className={`flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-semibold text-rose-600 hover:bg-rose-50 transition ${
            !sidebarOpen ? 'justify-center' : ''
          }`}
          title={!sidebarOpen ? 'Logout' : ''}
        >
          <FiLogOut className='h-5 w-5 shrink-0' />
          {sidebarOpen && <span>Log Out</span>}
        </button>
      </div>
    </aside>
  );
}
