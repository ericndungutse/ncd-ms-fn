import { IndicatorsList } from '../features/indicators';

export default function IndicatorsPage() {
  return (
    <div className='space-y-8 max-w-[1600px] mx-auto'>
      <div className='surface-card p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white border border-slate-200 rounded-lg shadow-sm'>
        <div>
          <h1 className='text-2xl font-semibold text-slate-900 mb-1'>NCD Indicators</h1>
          <p className='text-slate-600 text-sm'>Non-communicable disease screening indicators and measurements</p>
        </div>
      </div>

      <IndicatorsList />
    </div>
  );
}
