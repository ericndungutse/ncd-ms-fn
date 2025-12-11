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
      emerald: 'bg-emerald-50 text-emerald-700',
      amber: 'bg-amber-50 text-amber-700',
      rose: 'bg-rose-50 text-rose-700',
    };
    return colors[color];
  };

  return (
    <section className='surface-card p-5 border border-slate-200'>
      <div className='flex items-center justify-between'>
        <div>
          <h3 className='text-lg font-semibold text-slate-900 mb-1'>Quick actions</h3>
          <p className='text-sm text-slate-500'>Jump into the most common workflows</p>
        </div>
        <Badge>API endpoints</Badge>
      </div>
      <div className='mt-4 grid gap-3 md:grid-cols-3'>
        {actions.map((action) => (
          <div
            key={action.endpoint}
            className='flex items-center gap-3 rounded border border-slate-200 bg-white px-4 py-3'
          >
            <div
              className={`flex h-9 w-9 items-center justify-center rounded ${getColorClasses(
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
