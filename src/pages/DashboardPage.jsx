import Sidebar from '../features/dashboard/Sidebar';
import DashboardHeader from '../features/dashboard/DashboardHeader';
import StatsSection from '../features/dashboard/StatsSection';
import IndicatorsSection from '../features/dashboard/IndicatorsSection';
import AssessmentsAndCampaignsSection from '../features/dashboard/AssessmentsAndCampaignsSection';
import QuickActionsSection from '../features/dashboard/QuickActionsSection';

export default function DashboardPage() {
  const user = {
    name: 'Health Worker',
    role: 'NCDC Volunteer',
  };

  return (
    <div className='flex min-h-screen bg-slate-50 text-slate-900'>
      <Sidebar />

      {/* Main content */}
      <main className='flex-1 min-w-0'>
        <DashboardHeader user={user} />

        <div className='space-y-6 px-4 py-6 sm:px-6 lg:px-8'>
          <StatsSection />
          <IndicatorsSection />
          <AssessmentsAndCampaignsSection />
          <QuickActionsSection />
        </div>
      </main>
    </div>
  );
}
