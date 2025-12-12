import { useNavigate } from 'react-router-dom';
import { RecordAssessmentForm } from '../features/assessments';
import { FiArrowLeft } from 'react-icons/fi';

export default function RecordAssessmentPage() {
  const navigate = useNavigate();

  return (
    <div className='space-y-8 max-w-4xl mx-auto'>
      <div className='surface-card p-5 bg-white border border-slate-200 rounded-lg shadow-sm'>
        <button
          onClick={() => navigate('/assessments')}
          className='inline-flex items-center gap-2 text-sky-600 hover:text-sky-700 font-medium mb-3 transition-colors'
        >
          <FiArrowLeft className='h-4 w-4' />
          Back to Assessments
        </button>
        <h1 className='text-2xl font-semibold text-slate-900 mb-1'>Record Assessment</h1>
        <p className='text-slate-600 text-sm'>Record a new health assessment for a patient</p>
      </div>

      <div className='surface-card p-6 bg-white border border-slate-200 rounded-lg shadow-sm'>
        <RecordAssessmentForm onSuccess={() => navigate('/assessments')} />
      </div>
    </div>
  );
}
