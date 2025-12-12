import { AssessmentsList } from '../features/assessments';

export default function AssessmentsPage() {
  return (
    <div className='space-y-8 max-w-[1600px] mx-auto'>
      <div className='surface-card p-5 bg-white border border-slate-200 rounded-lg shadow-sm'>
        <h1 className='text-2xl font-semibold text-slate-900 mb-1'>Assessments</h1>
        <p className='text-slate-600 text-sm'>View and manage all health assessments</p>
      </div>

      <AssessmentsList />
    </div>
  );
}
