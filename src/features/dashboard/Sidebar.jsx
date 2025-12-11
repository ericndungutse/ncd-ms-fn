import { FiHome, FiBarChart2, FiMapPin, FiDatabase } from 'react-icons/fi';

export default function Sidebar() {
  const navItems = [
    { label: 'Overview', icon: FiHome, active: true },
    { label: 'Assessments', icon: FiBarChart2 },
    { label: 'Campaigns', icon: FiMapPin },
    { label: 'Indicators', icon: FiDatabase },
  ];

  return (
    <aside className='sticky top-0 hidden h-screen w-64 flex-col gap-6 overflow-y-auto border-r border-slate-200 bg-white/95 p-6 lg:flex'>
      <div>
        <h1 className='text-xl font-bold text-slate-900'>NCDC MS</h1>
      </div>
      <nav className='space-y-2'>
        {navItems.map((item) => (
          <button
            key={item.label}
            className={`flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-semibold transition ${
              item.active
                ? 'bg-emerald-50 text-emerald-700 ring-1 ring-emerald-100'
                : 'text-slate-600 hover:bg-slate-50'
            }`}
            type='button'
          >
            <item.icon className='h-4 w-4' />
            {item.label}
          </button>
        ))}
      </nav>
      <div className='mt-auto rounded-lg border border-slate-100 bg-slate-50 p-4'>
        <p className='text-sm font-semibold text-slate-800'>Today&apos;s focus</p>
        <p className='mt-1 text-xs text-slate-500'>Monitor assessments and keep campaigns on schedule.</p>
      </div>
    </aside>
  );
}
