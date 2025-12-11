import { FiArrowUpRight } from 'react-icons/fi';

export default function StatCard({ title, value, delta, icon: Icon, tone = 'teal', hint }) {
  const tones = {
    teal: {
      bg: 'bg-teal-50',
      text: 'text-teal-700',
      border: 'border-teal-200',
      iconBg: 'bg-teal-600',
      deltaBg: 'bg-teal-100',
      deltaText: 'text-teal-700',
    },
    amber: {
      bg: 'bg-amber-50',
      text: 'text-amber-700',
      border: 'border-amber-200',
      iconBg: 'bg-amber-600',
      deltaBg: 'bg-amber-100',
      deltaText: 'text-amber-700',
    },
    rose: {
      bg: 'bg-rose-50',
      text: 'text-rose-700',
      border: 'border-rose-200',
      iconBg: 'bg-rose-600',
      deltaBg: 'bg-rose-100',
      deltaText: 'text-rose-700',
    },
    slate: {
      bg: 'bg-slate-50',
      text: 'text-slate-700',
      border: 'border-slate-200',
      iconBg: 'bg-slate-600',
      deltaBg: 'bg-slate-100',
      deltaText: 'text-slate-700',
    },
  };

  const colors = tones[tone];

  return (
    <div
      className={`rounded-lg border ${colors.border} ${colors.bg} p-5 bg-white border-slate-200`}
    >
      <div className='flex items-start justify-between'>
        <div className='flex-1'>
          <p className='text-sm font-medium text-slate-600 mb-1'>{title}</p>
          <div className='flex items-center gap-3 mb-2'>
            <p className='text-3xl font-semibold text-slate-900'>{value}</p>
            {delta && (
              <span
                className={`flex items-center gap-1 rounded ${colors.deltaBg} px-2 py-0.5 text-xs font-medium ${colors.deltaText}`}
              >
                <FiArrowUpRight className='h-3 w-3' />
                {delta}
              </span>
            )}
          </div>
          {hint && <p className='text-xs text-slate-500'>{hint}</p>}
        </div>
        <div
          className={`rounded-lg ${colors.iconBg} p-2.5 text-white`}
        >
          <Icon className='h-5 w-5' />
        </div>
      </div>
    </div>
  );
}
