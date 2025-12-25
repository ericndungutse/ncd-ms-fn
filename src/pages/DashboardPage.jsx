import AdminDashboard from '../features/dashboard/admindashboard/AdminDashboard';
import AdmissionStaffDashboard from '../features/dashboard/admissionStaffDashboard/AdmissionStaffDashboard';
import VolunteerDashboard from '../features/dashboard/volunteerDashboard/VolunteerDashboard';
import Welcome from '../features/dashboard/Welcome';
import RequireRole from '../ui/RequireRole';

export default function DashboardPage() {
  return (
    <div className='min-h-screen px-4 py-1 sm:p-6 lg:p-8'>
      <div className='max-w-7xl mx-auto space-y-6'>
        <Welcome />
      </div>

      <RequireRole allowedRoles={['admin']}>
        <AdminDashboard />
      </RequireRole>

      <RequireRole allowedRoles={['admission staff']}>
        <AdmissionStaffDashboard />
      </RequireRole>

      <RequireRole allowedRoles={['screening volunteer']}>
        <VolunteerDashboard />
      </RequireRole>
    </div>
  );
}
