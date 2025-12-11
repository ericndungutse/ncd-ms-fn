import { FiArrowUpRight } from 'react-icons/fi';

export default function StatCard({ title, value, delta, icon: Icon, tone = 'teal', hint }) {
  const tones = {
    teal: 'bg-teal-50 text-teal-700 border-teal-100',
    amber: 'bg-amber-50 text-amber-700 border-amber-100',
    rose: 'bg-rose-50 text-rose-700 border-rose-100',
    slate: 'bg-slate-50 text-slate-700 border-slate-100',
  };

  return (
    <div className={`rounded-lg border ${tones[tone]} p-4`}>
      <div className='flex items-start justify-between'>
        <div>
          <p className='text-sm text-slate-500'>{title}</p>
          <div className='mt-1 flex items-center gap-2'>
            <p className='text-3xl font-semibold text-slate-900'>{value}</p>
            {delta && (
              <span className='flex items-center gap-1 rounded-full bg-white px-2 py-1 text-xs font-semibold text-teal-700 ring-1 ring-teal-100'>
                <FiArrowUpRight />
                {delta}
              </span>
            )}
          </div>
          {hint && <p className='mt-1 text-xs text-slate-500'>{hint}</p>}
        </div>
        <div className='rounded-xl bg-white p-3 text-teal-600 ring-1 ring-slate-100'>
          <Icon className='h-5 w-5' />
        </div>
      </div>
    </div>
  );
}
