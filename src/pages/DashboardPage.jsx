import { useState } from 'react';
import { FiActivity, FiClipboard, FiSearch, FiUserPlus, FiAlertCircle, FiLoader } from 'react-icons/fi';
import RegisterUserForm from '../features/users/RegisterUserForm';
import RecordAssessmentForm from '../features/assessments/RecordAssessmentForm';
import CreateDiagnosisForm from '../features/diagnosis/CreateDiagnosisForm';
import FormInput from '../ui/FormInput';
import Modal from '../ui/Modal';
import { getProfileByPatientNumber } from '../service/assessments.service';
import { getDiagnosisByPatientNumber } from '../service/diagnosis.service';
import { getErrorMessage } from '../utils/axios.utils';

function ActionCard({ title, icon: Icon, children }) {
  return (
    <div className='bg-white border border-slate-200 rounded-xl p-5 sm:p-6 hover:shadow-md transition-shadow'>
      <div className='flex items-center gap-3 mb-4'>
        {Icon && (
          <div className='shrink-0 w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-sky-100 flex items-center justify-center'>
            <Icon className='w-4 h-4 sm:w-5 sm:h-5 text-sky-600' />
          </div>
        )}
        <h2 className='text-base sm:text-lg font-semibold text-slate-900'>{title}</h2>
      </div>
      {children}
    </div>
  );
}

function FeedbackNote({ tone = 'info', message }) {
  if (!message) return null;

  const toneStyles =
    tone === 'success'
      ? 'bg-emerald-50 text-emerald-700 border-emerald-100'
      : tone === 'warning'
      ? 'bg-amber-50 text-amber-800 border-amber-100'
      : 'bg-slate-50 text-slate-700 border-slate-200';

  return (
    <div className={`rounded-lg border px-3 sm:px-4 py-2.5 sm:py-3 text-xs sm:text-sm ${toneStyles}`}>{message}</div>
  );
}

export default function DashboardPage() {
  const [searchPatientNumber, setSearchPatientNumber] = useState('');
  const [patientSearchResult, setPatientSearchResult] = useState(null);
  const [patientLoading, setPatientLoading] = useState(false);
  const [patientError, setPatientError] = useState('');
  const [patientProfile, setPatientProfile] = useState(null);
  const [searchDiagnosisNumber, setSearchDiagnosisNumber] = useState('');
  const [diagnosisSearchResult, setDiagnosisSearchResult] = useState(null);
  const [diagnosisLoading, setDiagnosisLoading] = useState(false);
  const [diagnosisError, setDiagnosisError] = useState('');
  const [diagnosisData, setDiagnosisData] = useState(null);
  const [isUserModalOpen, setIsUserModalOpen] = useState(false);
  const [isAssessmentModalOpen, setIsAssessmentModalOpen] = useState(false);
  const [isDiagnosisModalOpen, setIsDiagnosisModalOpen] = useState(false);

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
    <div className='min-h-screen bg-slate-50 p-4 sm:p-6 lg:p-8'>
      <div className='max-w-7xl mx-auto'>
        {/* Page Header */}
        <div className='mb-6 sm:mb-8'>
          <h1 className='text-2xl sm:text-3xl font-bold text-slate-900'>Clinical Dashboard</h1>
          <p className='text-sm text-slate-600 mt-1'>Fast access to patients, diagnoses, and assessments</p>
        </div>

        {/* Primary Actions */}
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8'>
          <button
            onClick={() => setIsAssessmentModalOpen(true)}
            className='group bg-white border border-slate-200 rounded-xl p-4 sm:p-5 flex items-center gap-3 hover:border-sky-300 hover:shadow-sm transition cursor-pointer'
          >
            <span className='w-10 h-10 rounded-lg bg-sky-50 flex items-center justify-center'>
              <FiClipboard className='w-5 h-5 text-sky-600' />
            </span>
            <div className='text-left'>
              <div className='text-sm font-semibold text-slate-900'>Record Assessment</div>
              <div className='text-xs text-slate-600'>Capture patient vitals</div>
            </div>
          </button>

          <button
            onClick={() => setIsDiagnosisModalOpen(true)}
            className='group bg-white border border-slate-200 rounded-xl p-4 sm:p-5 flex items-center gap-3 hover:border-emerald-300 hover:shadow-sm transition cursor-pointer'
          >
            <span className='w-10 h-10 rounded-lg bg-emerald-50 flex items-center justify-center'>
              <FiActivity className='w-5 h-5 text-emerald-600' />
            </span>
            <div className='text-left'>
              <div className='text-sm font-semibold text-slate-900'>Create Diagnosis</div>
              <div className='text-xs text-slate-600'>Assign required assessments</div>
            </div>
          </button>

          <button
            onClick={() => setIsUserModalOpen(true)}
            className='group bg-white border border-slate-200 rounded-xl p-4 sm:p-5 flex items-center gap-3 hover:border-blue-300 hover:shadow-sm transition cursor-pointer'
          >
            <span className='w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center'>
              <FiUserPlus className='w-5 h-5 text-blue-600' />
            </span>
            <div className='text-left'>
              <div className='text-sm font-semibold text-slate-900'>Register User</div>
              <div className='text-xs text-slate-600'>Create a patient record</div>
            </div>
          </button>
        </div>

        {/* Content Cards */}
        <div className='grid grid-cols-1 lg:grid-cols-3 gap-6'>
          {/* Patients */}
          <div className='bg-white rounded-xl border border-slate-200 p-5 sm:p-6'>
            <div className='flex items-center justify-between mb-4'>
              <h2 className='text-base sm:text-lg font-semibold text-slate-900'>Patient Lookup</h2>
              <FiSearch className='w-5 h-5 text-slate-400' />
            </div>
            <form onSubmit={handleSearchPatient} className='space-y-3'>
              <FormInput
                value={searchPatientNumber}
                onChange={(e) => setSearchPatientNumber(e.target.value)}
                placeholder='Enter patient number'
              />
              <button
                type='submit'
                className='w-full px-4 py-2 bg-slate-900 text-white text-sm font-medium rounded-lg hover:bg-slate-800 transition-colors cursor-pointer'
              >
                Search Patient
              </button>
            </form>
            {patientSearchResult?.status === 'empty' && (
              <div className='mt-3 rounded-lg border border-amber-200 bg-amber-50 px-3 py-2 text-xs text-amber-800 flex items-center gap-2'>
                <FiAlertCircle className='w-4 h-4 shrink-0' />
                <span>Please enter a patient number</span>
              </div>
            )}
            {patientLoading && (
              <div className='mt-3 rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-xs text-slate-700 flex items-center gap-2'>
                <FiLoader className='w-4 h-4 shrink-0 animate-spin' />
                <span>Searching…</span>
              </div>
            )}
            {!patientLoading && patientError && (
              <div className='mt-3 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-xs text-red-800 flex items-center gap-2'>
                <FiAlertCircle className='w-4 h-4 shrink-0' />
                <span>{patientError}</span>
              </div>
            )}
            {!patientLoading && patientProfile && (
              <div className='mt-3 bg-slate-50 border border-slate-200 rounded-lg p-4 space-y-2'>
                <div className='flex justify-between text-sm'>
                  <span className='text-slate-600'>Name:</span>
                  <span className='font-medium text-slate-900'>
                    {patientProfile.firstName} {patientProfile.lastName}
                  </span>
                </div>
                <div className='flex justify-between text-sm'>
                  <span className='text-slate-600'>Patient #:</span>
                  <span className='font-medium text-slate-900'>{patientProfile.patientNumber}</span>
                </div>
                <div className='flex justify-between text-sm'>
                  <span className='text-slate-600'>Phone:</span>
                  <span className='font-medium text-slate-900'>{patientProfile.phoneNumber || '—'}</span>
                </div>
                <div className='flex justify-between text-sm'>
                  <span className='text-slate-600'>Address:</span>
                  <span className='font-medium text-slate-900 text-right'>
                    {patientProfile.address?.district}, {patientProfile.address?.sector}
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Diagnosis */}
          <div className='bg-white rounded-xl border border-slate-200 p-5 sm:p-6'>
            <div className='flex items-center justify-between mb-4'>
              <h2 className='text-base sm:text-lg font-semibold text-slate-900'>Diagnosis</h2>
              <FiActivity className='w-5 h-5 text-emerald-500' />
            </div>
            <form onSubmit={handleSearchDiagnosis} className='space-y-3 mb-3'>
              <FormInput
                value={searchDiagnosisNumber}
                onChange={(e) => setSearchDiagnosisNumber(e.target.value)}
                placeholder='Enter patient number'
              />
              <button
                type='submit'
                className='w-full px-4 py-2 bg-emerald-600 text-white text-sm font-medium rounded-lg hover:bg-emerald-700 transition-colors cursor-pointer'
              >
                Search Diagnosis
              </button>
            </form>
            {diagnosisSearchResult?.status === 'empty' && (
              <div className='mt-3 rounded-lg border border-amber-200 bg-amber-50 px-3 py-2 text-xs text-amber-800 flex items-center gap-2'>
                <FiAlertCircle className='w-4 h-4 shrink-0' />
                <span>Please enter a patient number</span>
              </div>
            )}
            {diagnosisLoading && (
              <div className='mt-3 rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-xs text-slate-700 flex items-center gap-2'>
                <FiLoader className='w-4 h-4 shrink-0 animate-spin' />
                <span>Searching diagnosis…</span>
              </div>
            )}
            {!diagnosisLoading && diagnosisError && (
              <div className='mt-3 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-xs text-red-800 flex items-center gap-2'>
                <FiAlertCircle className='w-4 h-4 shrink-0' />
                <span>{diagnosisError}</span>
              </div>
            )}
            {!diagnosisLoading && diagnosisData && (
              <div className='mt-3 bg-emerald-50 border border-emerald-200 rounded-lg p-4 space-y-3'>
                {diagnosisData.profileId && (
                  <div className='flex justify-between text-sm'>
                    <span className='text-slate-600'>Patient:</span>
                    <span className='font-medium text-slate-900'>
                      {diagnosisData.profileId.firstName} {diagnosisData.profileId.lastName}
                    </span>
                  </div>
                )}
                <div className='flex justify-between text-sm'>
                  <span className='text-slate-600'>Patient #:</span>
                  <span className='font-medium text-slate-900'>{diagnosisData.patientNumber}</span>
                </div>
                {diagnosisData.status && (
                  <div className='flex justify-between text-sm'>
                    <span className='text-slate-600'>Status:</span>
                    <span className='font-medium text-emerald-700 capitalize'>{diagnosisData.status}</span>
                  </div>
                )}
                {diagnosisData.requiredAssessments && diagnosisData.requiredAssessments.length > 0 && (
                  <div className='text-sm'>
                    <div className='text-slate-600 font-medium mb-2'>Required Assessments:</div>
                    <div className='space-y-2'>
                      {diagnosisData.requiredAssessments.map((assessment, idx) => (
                        <div key={idx} className='bg-white rounded p-2.5 text-xs space-y-1'>
                          <div className='flex justify-between items-center'>
                            <span className='font-medium text-slate-900'>
                              {assessment.indicator?.name || 'Unknown'}
                            </span>
                            <span
                              className={`text-xs px-2 py-0.5 rounded font-medium ${
                                assessment.taken ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'
                              }`}
                            >
                              {assessment.taken ? 'Done' : 'Pending'}
                            </span>
                          </div>
                          {assessment.assessmentId?.classification && (
                            <div className='text-slate-700 pt-1'>
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
            <button
              onClick={() => setIsDiagnosisModalOpen(true)}
              className='mt-4 w-full px-4 py-2.5 bg-emerald-600 text-white text-sm font-medium rounded-lg hover:bg-emerald-700 transition-colors cursor-pointer'
            >
              Create Diagnosis
            </button>
          </div>

          {/* Assessments */}
          <div className='bg-white rounded-xl border border-slate-200 p-5 sm:p-6'>
            <div className='flex items-center justify-between mb-4'>
              <h2 className='text-base sm:text-lg font-semibold text-slate-900'>Assessments</h2>
              <FiClipboard className='w-5 h-5 text-sky-600' />
            </div>
            <p className='text-sm text-slate-600 mb-4'>Record patient vitals and indicators</p>
            <button
              onClick={() => setIsAssessmentModalOpen(true)}
              className='w-full px-4 py-2.5 bg-sky-600 text-white text-sm font-medium rounded-lg hover:bg-sky-700 transition-colors cursor-pointer'
            >
              Record Assessment
            </button>
          </div>
        </div>
      </div>

      {/* Modals */}
      <Modal
        isOpen={isUserModalOpen}
        onClose={() => setIsUserModalOpen(false)}
        title='Register user'
        description='Create a new user account'
        size='xl'
      >
        <RegisterUserForm
          mode='modal'
          onSuccess={() => setIsUserModalOpen(false)}
          onCancel={() => setIsUserModalOpen(false)}
        />
      </Modal>

      <Modal
        isOpen={isAssessmentModalOpen}
        onClose={() => setIsAssessmentModalOpen(false)}
        title='Record assessment'
        description='Search diagnosis and record pending indicators'
        size='lg'
      >
        <RecordAssessmentForm onSuccess={() => setIsAssessmentModalOpen(false)} />
      </Modal>

      <Modal
        isOpen={isDiagnosisModalOpen}
        onClose={() => setIsDiagnosisModalOpen(false)}
        title='Create diagnosis'
        description='Create a diagnosis for a patient'
        size='lg'
      >
        <CreateDiagnosisForm
          mode='modal'
          onSuccess={() => setIsDiagnosisModalOpen(false)}
          onCancel={() => setIsDiagnosisModalOpen(false)}
        />
      </Modal>
    </div>
  );
}
