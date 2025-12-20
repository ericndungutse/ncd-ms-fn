import { useNavigate } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import { FiLogOut, FiChevronDown } from 'react-icons/fi';
import { queryClient } from '../../main';

export default function DashboardHeader({ user }) {
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscape);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, []);

  const handleLogout = () => {
    queryClient.clear();
    navigate('/login', { replace: true });
  };

  return (
    <header className='sticky top-0 z-20 flex items-center justify-between gap-4 border-b border-slate-200 bg-white px-6 py-4'>
      <div>
        <h1 className='text-xl font-semibold text-slate-900'>NCDs Management System</h1>
        <p className='text-xs text-slate-500'>Screening, follow-up, and community engagement</p>
      </div>
      <div className='relative' ref={dropdownRef}>
        <button
          onClick={() => setDropdownOpen(!dropdownOpen)}
          className='flex items-center gap-2 px-3 py-2 hover:bg-slate-50 rounded-lg transition-colors cursor-pointer'
        >
          <div className='text-right'>
            <p className='text-sm font-medium text-slate-900'>{user?.name || 'User'}</p>
            <p className='text-xs text-slate-500'>{user?.role || 'Role'}</p>
          </div>
          <FiChevronDown
            className={`h-4 w-4 text-slate-400 transition-transform ${dropdownOpen ? 'rotate-180' : ''}`}
          />
        </button>

        {dropdownOpen && (
          <div className='absolute right-0 mt-2 w-48 rounded-lg border border-slate-200 bg-white shadow-lg py-1'>
            <button
              onClick={handleLogout}
              className='w-full flex items-center gap-2 px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 transition-colors cursor-pointer'
            >
              <FiLogOut className='h-4 w-4' />
              Logout
            </button>
          </div>
        )}
      </div>
    </header>
  );
}
