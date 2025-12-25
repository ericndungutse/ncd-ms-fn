import DashboardLookup from '../DashboardLookup';
import QuickActionsSection from '../QuickActionsSection';

export default function AdmissionStaffDashboard() {
  return (
    <div className='grid grid-cols-1 lg:grid-cols-3 gap-6'>
      {/* Left Column - Quick Actions */}
      <div className='lg:col-span-1 space-y-4'>
        <QuickActionsSection />
      </div>

      <DashboardLookup />
    </div>
  );
}
