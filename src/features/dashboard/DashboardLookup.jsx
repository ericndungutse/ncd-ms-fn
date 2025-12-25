import PatientLookup from './PatientLookup';
import ScreeningLookup from './ScreeningLookup';

export default function DashboardLookup() {
  return (
    <div className='lg:col-span-2 space-y-6'>
      <PatientLookup />
      <ScreeningLookup />
    </div>
  );
}
