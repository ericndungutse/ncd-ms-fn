import Badge from '../../ui/Badge';
import { FiActivity, FiMapPin, FiDatabase } from 'react-icons/fi';

export default function QuickActionsSection() {
  const actions = [
    {
      title: 'Record Assessment',
      endpoint: 'POST /api/v1/assessments',
      icon: FiActivity,
      color: 'emerald',
    },
    {
      title: 'Create Campaign',
      endpoint: 'POST /api/v1/screening-campaigns',
      icon: FiMapPin,
      color: 'amber',
    },
    {
      title: 'View Indicators',
      endpoint: 'GET /api/v1/indicators',
      icon: FiDatabase,
      color: 'rose',
    },
  ];

  const getColorClasses = (color) => {
    const colors = {
      emerald: 'bg-emerald-50 text-emerald-600 ring-emerald-100',
      amber: 'bg-amber-50 text-amber-600 ring-amber-100',
      rose: 'bg-rose-50 text-rose-600 ring-rose-100',
    };
    return colors[color];
  };

  return (
    <section className='rounded-lg border border-slate-200 bg-white p-6'>
      <div className='flex items-center justify-between'>
        <div>
          <p className='text-sm text-slate-500'>System integration</p>
          <h3 className='text-lg font-semibold text-slate-900'>Quick actions</h3>
        </div>
        <Badge>API Endpoints</Badge>
      </div>
      <div className='mt-4 grid gap-3 md:grid-cols-3'>
        {actions.map((action) => (
          <div
            key={action.endpoint}
            className='flex items-center gap-3 rounded-lg border border-slate-200 bg-slate-50 px-4 py-3'
          >
            <div
              className={`flex h-10 w-10 items-center justify-center rounded-full ring-1 ${getColorClasses(
                action.color
              )}`}
            >
              <action.icon />
            </div>
            <div className='flex-1'>
              <p className='text-sm font-semibold text-slate-900'>{action.title}</p>
              <p className='text-xs text-slate-500'>{action.endpoint}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
