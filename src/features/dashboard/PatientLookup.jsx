import { useState } from 'react';
import { FiAlertCircle, FiLoader, FiSearch } from 'react-icons/fi';
import { getProfileByPatientNumber } from '../../service/assessments.service';
import { getErrorMessage } from '../../utils/axios.utils';
import FormInput from '../../ui/FormInput';

export default function PatientLookup() {
  const [searchPatientNumber, setSearchPatientNumber] = useState('');
  const [patientSearchResult, setPatientSearchResult] = useState(null);
  const [patientLoading, setPatientLoading] = useState(false);
  const [patientError, setPatientError] = useState('');
  const [patientProfile, setPatientProfile] = useState(null);

  const handleSearchPatient = async (event) => {
    event.preventDefault();
    const trimmed = searchPatientNumber.trim();
    if (!trimmed) {
      setPatientSearchResult({ patientNumber: '', status: 'empty' });
      setPatientProfile(null);
      setPatientError('');
      return;
    }
    try {
      setPatientLoading(true);
      setPatientError('');
      setPatientProfile(null);
      const response = await getProfileByPatientNumber(trimmed);
      const data = response?.data?.data || response?.data;
      setPatientProfile(data || null);
      setPatientSearchResult({ patientNumber: trimmed, status: 'searched' });
    } catch (err) {
      setPatientError(getErrorMessage(err));
      setPatientProfile(null);
      setPatientSearchResult({ patientNumber: trimmed, status: 'searched' });
    } finally {
      setPatientLoading(false);
    }
  };
  return (
    <div className='bg-white rounded-xl border border-slate-200 p-6'>
      <div className='flex items-center gap-3 mb-5'>
        <div className='w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center'>
          <FiSearch className='w-5 h-5 text-slate-600' />
        </div>
        <div>
          <h2 className='text-lg font-semibold text-slate-900'>Patient Lookup</h2>
          <p className='text-sm text-slate-600'>Search patient by number</p>
        </div>
      </div>

      <form onSubmit={handleSearchPatient} className='space-y-4'>
        <FormInput
          value={searchPatientNumber}
          onChange={(e) => setSearchPatientNumber(e.target.value)}
          placeholder='Enter patient number'
        />
        <button
          type='submit'
          disabled={patientLoading}
          className='w-full px-4 py-2.5 bg-slate-900 text-white text-sm font-semibold rounded-lg hover:bg-slate-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed'
        >
          {patientLoading ? 'Searching...' : 'Search Patient'}
        </button>
      </form>

      {patientSearchResult?.status === 'empty' && (
        <div className='mt-4 rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800 flex items-start gap-2'>
          <FiAlertCircle className='w-5 h-5 shrink-0 mt-0.5' />
          <span>Please enter a patient number</span>
        </div>
      )}

      {patientLoading && (
        <div className='mt-4 rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700 flex items-center gap-2'>
          <FiLoader className='w-5 h-5 shrink-0 animate-spin' />
          <span>Searching for patient...</span>
        </div>
      )}

      {!patientLoading && patientError && (
        <div className='mt-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800 flex items-start gap-2'>
          <FiAlertCircle className='w-5 h-5 shrink-0 mt-0.5' />
          <span>{patientError}</span>
        </div>
      )}

      {!patientLoading && patientProfile && (
        <div className='mt-4 bg-linear-to-br from-slate-50 to-slate-100 border border-slate-200 rounded-xl p-5'>
          <div className='flex items-start justify-between mb-4'>
            <div>
              <h3 className='text-lg font-bold text-slate-900'>
                {patientProfile.firstName} {patientProfile.lastName}
              </h3>
              <p className='text-sm text-slate-600'>Patient #{patientProfile.patientNumber}</p>
            </div>
            <span className='px-3 py-1 bg-emerald-100 text-emerald-700 text-xs font-semibold rounded-full'>Active</span>
          </div>
          <div className='grid grid-cols-2 gap-4'>
            <div className='bg-white rounded-lg p-3'>
              <p className='text-xs text-slate-600 mb-1'>Phone Number</p>
              <p className='font-medium text-slate-900'>{patientProfile.phoneNumber || '—'}</p>
            </div>
            <div className='bg-white rounded-lg p-3'>
              <p className='text-xs text-slate-600 mb-1'>Location</p>
              <p className='font-medium text-slate-900'>
                {patientProfile.address?.district}, {patientProfile.address?.sector}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
