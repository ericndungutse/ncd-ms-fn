import { useState } from 'react';
import { FiActivity, FiAlertCircle, FiLoader } from 'react-icons/fi';
import { getDiagnosisByPatientNumber } from '../../service/diagnosis.service';
import FormInput from '../../ui/FormInput';
import { getErrorMessage } from '../../utils/axios.utils';

export default function ScreeningLookup() {
  const [searchDiagnosisNumber, setSearchDiagnosisNumber] = useState('');
  const [diagnosisSearchResult, setDiagnosisSearchResult] = useState(null);
  const [diagnosisLoading, setDiagnosisLoading] = useState(false);
  const [diagnosisError, setDiagnosisError] = useState('');
  const [diagnosisData, setDiagnosisData] = useState(null);
  const handleSearchDiagnosis = async (event) => {
    event.preventDefault();
    const trimmed = searchDiagnosisNumber.trim();
    if (!trimmed) {
      setDiagnosisSearchResult({ patientNumber: '', status: 'empty' });
      setDiagnosisData(null);
      setDiagnosisError('');
      return;
    }
    try {
      setDiagnosisLoading(true);
      setDiagnosisError('');
      setDiagnosisData(null);
      const response = await getDiagnosisByPatientNumber(trimmed);
      const data = response?.data?.data?.diagnosis || response?.data?.diagnosis || response?.data;
      setDiagnosisData(data || null);
      setDiagnosisSearchResult({ patientNumber: trimmed, status: 'searched' });
    } catch (err) {
      setDiagnosisError(getErrorMessage(err));
      setDiagnosisData(null);
      setDiagnosisSearchResult({ patientNumber: trimmed, status: 'searched' });
    } finally {
      setDiagnosisLoading(false);
    }
  };
  return (
    <div className='bg-white rounded-xl border border-slate-200 p-6'>
      <div className='flex items-center gap-3 mb-5'>
        <div className='w-10 h-10 rounded-lg bg-emerald-100 flex items-center justify-center'>
          <FiActivity className='w-5 h-5 text-emerald-600' />
        </div>
        <div>
          <h2 className='text-lg font-semibold text-slate-900'>Diagnosis Lookup</h2>
          <p className='text-sm text-slate-600'>View patient diagnosis details</p>
        </div>
      </div>

      <form onSubmit={handleSearchDiagnosis} className='space-y-4'>
        <FormInput
          value={searchDiagnosisNumber}
          onChange={(e) => setSearchDiagnosisNumber(e.target.value)}
          placeholder='Enter patient number'
        />
        <button
          type='submit'
          disabled={diagnosisLoading}
          className='w-full px-4 py-2.5 bg-emerald-600 text-white text-sm font-semibold rounded-lg hover:bg-emerald-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed'
        >
          {diagnosisLoading ? 'Searching...' : 'Search Diagnosis'}
        </button>
      </form>

      {diagnosisSearchResult?.status === 'empty' && (
        <div className='mt-4 rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800 flex items-start gap-2'>
          <FiAlertCircle className='w-5 h-5 shrink-0 mt-0.5' />
          <span>Please enter a patient number</span>
        </div>
      )}

      {diagnosisLoading && (
        <div className='mt-4 rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700 flex items-center gap-2'>
          <FiLoader className='w-5 h-5 shrink-0 animate-spin' />
          <span>Searching for diagnosis...</span>
        </div>
      )}

      {!diagnosisLoading && diagnosisError && (
        <div className='mt-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800 flex items-start gap-2'>
          <FiAlertCircle className='w-5 h-5 shrink-0 mt-0.5' />
          <span>{diagnosisError}</span>
        </div>
      )}

      {!diagnosisLoading && diagnosisData && (
        <div className='mt-4 bg-linear-to-br from-emerald-50 to-teal-50 border border-emerald-200 rounded-xl p-5'>
          <div className='flex items-start justify-between mb-4'>
            <div>
              {diagnosisData.profileId && (
                <h3 className='text-lg font-bold text-slate-900'>
                  {diagnosisData.profileId.firstName} {diagnosisData.profileId.lastName}
                </h3>
              )}
              <p className='text-sm text-slate-600'>Patient #{diagnosisData.patientNumber}</p>
            </div>
            {diagnosisData.status && (
              <span className='px-3 py-1 bg-emerald-600 text-white text-xs font-semibold rounded-full capitalize'>
                {diagnosisData.status}
              </span>
            )}
          </div>

          {diagnosisData.requiredAssessments && diagnosisData.requiredAssessments.length > 0 && (
            <div>
              <h4 className='text-sm font-semibold text-slate-900 mb-3'>Required Assessments</h4>
              <div className='space-y-2'>
                {diagnosisData.requiredAssessments.map((assessment, idx) => (
                  <div key={idx} className='bg-white rounded-lg p-3 border border-emerald-100'>
                    <div className='flex justify-between items-start mb-2'>
                      <span className='font-medium text-slate-900 text-sm'>
                        {assessment.indicator?.name || 'Unknown'}
                      </span>
                      <span
                        className={`text-xs px-2 py-1 rounded font-semibold ${
                          assessment.taken ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'
                        }`}
                      >
                        {assessment.taken ? '✓ Completed' : 'Pending'}
                      </span>
                    </div>
                    {assessment.assessmentId?.classification && (
                      <div className='text-sm text-slate-700 bg-slate-50 rounded p-2'>
                        <span className='font-medium'>Result:</span> {assessment.assessmentId.classification}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
