import StatsSectiion from '../features/dashboard/StatsSection';
import IndicatorsSection from '../features/dashboard/IndicatorsSection';
import AssessmentsAndCampaignsSection from '../features/dashboard/AssessmentsAndCampaignsSection';

import QuickActionsSectiom from '../features/dashboard/QuickActionsSection';

export default function DashboardPage() {
  return (
    <div className='space-y-8 max-w-[1600px] mx-auto'>
      <div className='surface-card px-6 py-5 flex flex-col gap-2 bg-white border border-slate-200'>
        <div className='flex flex-wrap items-center justify-between gap-3'>
          <div>
            <h1 className='text-2xl font-semibold text-slate-900 mb-1'>Dashboard</h1>
            <p className='text-slate-600 text-sm'>Health screening activities and follow-ups</p>
          </div>
          <span className='inline-flex items-center gap-2 rounded border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-700'>
            Live data mode
          </span>
        </div>
      </div>

      <div className='space-y-6'>
        <StatsSectiion />
        <IndicatorsSection />
        <AssessmentsAndCampaignsSection />
        <QuickActionsSectiom />
      </div>
    </div>
  );
}
