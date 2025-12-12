import { Link } from 'react-router-dom';
import { AssessmentsList } from '../features/assessments';
import { FiPlus } from 'react-icons/fi';

export default function AssessmentsPage() {
  return (
    <div className='space-y-8 max-w-[1600px] mx-auto'>
      <div className='surface-card p-5 bg-white border border-slate-200 rounded-lg shadow-sm flex items-center justify-between'>
        <div>
          <h1 className='text-2xl font-semibold text-slate-900 mb-1'>Assessments</h1>
          <p className='text-slate-600 text-sm'>View and manage all health assessments</p>
        </div>
        <Link
          to='/assessments/record'
          className='inline-flex items-center gap-2 px-4 py-2.5 bg-sky-600 text-white rounded-lg hover:bg-sky-700 font-medium transition-colors'
        >
          <FiPlus className='h-5 w-5' />
          Record Assessment
        </Link>
      </div>

      <AssessmentsList />
    </div>
  );
}
