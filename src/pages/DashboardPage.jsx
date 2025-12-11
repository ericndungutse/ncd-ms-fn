import StatsSectiion from '../features/dashboard/StatsSection';
import IndicatorsSection from '../features/dashboard/IndicatorsSection';
import AssessmentsAndCampaignsSection from '../features/dashboard/AssessmentsAndCampaignsSection';

import QuickActionsSectiom from '../features/dashboard/QuickActionsSection';

export default function DashboardPage() {
  return (
    <div className='flex min-h-screen bg-slate-50 text-slate-900'>
      <main className='flex-1 min-w-0'>
        <div className='space-y-6 px-4 py-6 sm:px-6 lg:px-8'>
          <StatsSectiion />
          <IndicatorsSection />
          <AssessmentsAndCampaignsSection />
          <QuickActionsSectiom />
        </div>
      </main>
    </div>
  );
}
