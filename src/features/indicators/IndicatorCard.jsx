import { FiActivity } from 'react-icons/fi';

export default function IndicatorCard({ indicator }) {
  return (
    <div className='rounded-lg border border-slate-200 bg-white p-6 shadow-sm hover:shadow-md transition-shadow'>
      {/* Header */}
      <div className='flex items-start gap-3 mb-4'>
        <div className='p-2 rounded-lg bg-sky-50 border border-sky-100'>
          <FiActivity className='h-5 w-5 text-sky-600' />
        </div>
        <div className='flex-1'>
          <h3 className='text-lg font-semibold text-slate-900'>{indicator.name}</h3>
        </div>
      </div>

      {/* Readings */}
      <div className='space-y-3'>
        <div className='text-xs font-semibold uppercase tracking-wider text-slate-500 mb-2'>Readings</div>
        {indicator.readings.map((reading, index) => (
          <div
            key={index}
            className='flex items-center justify-between p-3 rounded-lg bg-slate-50 border border-slate-100'
          >
            <span className='text-sm font-medium text-slate-700'>{reading.type}</span>
            <span className='text-xs font-semibold text-slate-500 bg-white px-2 py-1 rounded border border-slate-200'>
              {reading.unit}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
