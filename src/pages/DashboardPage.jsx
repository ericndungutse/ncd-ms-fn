import { useMemo, useState } from 'react';
import { FiActivity, FiClipboard, FiSearch, FiUserPlus } from 'react-icons/fi';
import RegisterUserForm from '../features/users/RegisterUserForm';
import RecordAssessmentForm from '../features/assessments/RecordAssessmentForm';
import CreateDiagnosisForm from '../features/diagnosis/CreateDiagnosisForm';
import FormInput from '../ui/FormInput';
import Modal from '../ui/Modal';

const mockDiagnoses = [
  {
    patientNumber: 'PAT-001',
    name: 'Amina Bello',
    diagnosis: 'Acute malaria',
    status: 'Under observation',
    updated: 'Today - 08:45',
  },
  {
    patientNumber: 'PAT-118',
    name: 'John Adeyemi',
    diagnosis: 'Suspected pneumonia',
    status: 'Admitted',
    updated: 'Yesterday - 19:10',
  },
  {
    patientNumber: 'PAT-204',
    name: 'Ngozi Okafor',
    diagnosis: 'Hypertension follow-up',
    status: 'Outpatient review',
    updated: 'Today - 10:05',
  },
];

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
  const [searchDiagnosisNumber, setSearchDiagnosisNumber] = useState('');
  const [diagnosisSearchResult, setDiagnosisSearchResult] = useState(null);
  const [isUserModalOpen, setIsUserModalOpen] = useState(false);
  const [isAssessmentModalOpen, setIsAssessmentModalOpen] = useState(false);
  const [isDiagnosisModalOpen, setIsDiagnosisModalOpen] = useState(false);

  const foundDiagnosis = useMemo(() => {
    if (!diagnosisSearchResult || !diagnosisSearchResult.patientNumber) return null;
    return mockDiagnoses.find(
      (entry) => entry.patientNumber.toUpperCase() === diagnosisSearchResult.patientNumber.toUpperCase()
    );
  }, [diagnosisSearchResult]);

  const handleSearchPatient = (event) => {
    event.preventDefault();
    const trimmed = searchPatientNumber.trim().toUpperCase();
    if (!trimmed) {
      setPatientSearchResult({ patientNumber: '', status: 'empty' });
      return;
    }

    setPatientSearchResult({ patientNumber: trimmed, status: 'searched' });
  };

  const handleSearchDiagnosis = (event) => {
    event.preventDefault();
    const trimmed = searchDiagnosisNumber.trim().toUpperCase();
    if (!trimmed) {
      setDiagnosisSearchResult({ patientNumber: '', status: 'empty' });
      return;
    }

    setDiagnosisSearchResult({ patientNumber: trimmed, status: 'searched' });
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
              <p className='text-xs text-amber-600 mt-2'>Please enter a patient number</p>
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
              <p className='text-xs text-amber-600'>Please enter a patient number</p>
            )}
            {diagnosisSearchResult?.status === 'searched' && !foundDiagnosis && (
              <p className='text-xs text-slate-600'>No diagnosis found for {diagnosisSearchResult.patientNumber}</p>
            )}
            {foundDiagnosis && (
              <div className='bg-emerald-50 border border-emerald-200 rounded-lg p-4 space-y-2'>
                <div className='flex justify-between text-sm'>
                  <span className='text-slate-600'>Name:</span>
                  <span className='font-medium text-slate-900'>{foundDiagnosis.name}</span>
                </div>
                <div className='flex justify-between text-sm'>
                  <span className='text-slate-600'>Patient #:</span>
                  <span className='font-medium text-slate-900'>{foundDiagnosis.patientNumber}</span>
                </div>
                <div className='flex justify-between text-sm'>
                  <span className='text-slate-600'>Diagnosis:</span>
                  <span className='font-medium text-slate-900 text-right'>{foundDiagnosis.diagnosis}</span>
                </div>
                <div className='flex justify-between text-sm'>
                  <span className='text-slate-600'>Status:</span>
                  <span className='font-medium text-emerald-700'>{foundDiagnosis.status}</span>
                </div>
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
      <Modal isOpen={isUserModalOpen} onClose={() => setIsUserModalOpen(false)} title='Register user'>
        <RegisterUserForm
          mode='modal'
          onSuccess={() => setIsUserModalOpen(false)}
          onCancel={() => setIsUserModalOpen(false)}
        />
      </Modal>

      <Modal isOpen={isAssessmentModalOpen} onClose={() => setIsAssessmentModalOpen(false)} title='Record assessment'>
        <RecordAssessmentForm onSuccess={() => setIsAssessmentModalOpen(false)} />
      </Modal>

      <Modal isOpen={isDiagnosisModalOpen} onClose={() => setIsDiagnosisModalOpen(false)} title='Create diagnosis'>
        <CreateDiagnosisForm
          mode='modal'
          onSuccess={() => setIsDiagnosisModalOpen(false)}
          onCancel={() => setIsDiagnosisModalOpen(false)}
        />
      </Modal>
    </div>
  );
}
