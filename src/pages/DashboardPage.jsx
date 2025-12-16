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
  const [searchNumber, setSearchNumber] = useState('');
  const [searchResult, setSearchResult] = useState(null);
  const [isUserModalOpen, setIsUserModalOpen] = useState(false);
  const [isAssessmentModalOpen, setIsAssessmentModalOpen] = useState(false);
  const [isDiagnosisModalOpen, setIsDiagnosisModalOpen] = useState(false);

  const foundDiagnosis = useMemo(() => {
    if (!searchResult || !searchResult.patientNumber) return null;
    return mockDiagnoses.find(
      (entry) => entry.patientNumber.toUpperCase() === searchResult.patientNumber.toUpperCase()
    );
  }, [searchResult]);

  const handleSearch = (event) => {
    event.preventDefault();
    const trimmed = searchNumber.trim().toUpperCase();
    if (!trimmed) {
      setSearchResult({ patientNumber: '', status: 'empty' });
      return;
    }

    setSearchResult({ patientNumber: trimmed, status: 'searched' });
  };

  return (
    <div className='min-h-screen bg-slate-50 p-3 sm:p-4 md:p-6'>
      <div className='max-w-7xl mx-auto'>
        <div className='grid grid-cols-1 lg:grid-cols-4 gap-4 sm:gap-5 lg:gap-6'>
          {/* Main Content Area - 3 columns */}
          <div className='lg:col-span-3 space-y-4 sm:space-y-5 lg:space-y-6'>
            {/* Search Patient - Full Width */}
            <ActionCard title='Search patient' icon={FiSearch}>
              <form onSubmit={handleSearch} className='space-y-3 sm:space-y-4'>
                <div className='flex flex-col sm:flex-row gap-2 sm:gap-3'>
                  <div className='flex-1'>
                    <input
                      type='text'
                      value={searchNumber}
                      onChange={(e) => setSearchNumber(e.target.value)}
                      placeholder='Enter patient number (e.g. PAT-001)'
                      className='w-full px-3 sm:px-4 py-2.5 sm:py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent text-sm sm:text-base text-slate-900 placeholder:text-slate-400'
                    />
                  </div>
                  <button
                    type='submit'
                    className='px-4 sm:px-6 py-2.5 sm:py-3 bg-sky-600 text-white text-sm sm:text-base font-semibold rounded-lg hover:bg-sky-700 transition-colors flex items-center justify-center gap-2 whitespace-nowrap cursor-pointer'
                  >
                    <FiSearch className='w-4 h-4' />
                    <span>Search</span>
                  </button>
                </div>
              </form>

              {searchResult?.status === 'empty' && (
                <FeedbackNote tone='warning' message='Enter a patient number to search.' />
              )}

              {searchResult?.status === 'searched' && !foundDiagnosis && (
                <FeedbackNote tone='info' message={`No diagnosis found for ${searchResult.patientNumber}.`} />
              )}

              {foundDiagnosis && (
                <div className='rounded-lg border border-emerald-200 bg-emerald-50 p-4 sm:p-5 space-y-2 sm:space-y-3 animate-fade-in'>
                  <div className='flex items-center justify-between'>
                    <h3 className='text-sm sm:text-base font-semibold text-emerald-900'>Patient Found</h3>
                    <span className='text-xs font-medium text-emerald-700'>{foundDiagnosis.updated}</span>
                  </div>
                  <div className='space-y-1.5 sm:space-y-2 text-xs sm:text-sm text-emerald-900'>
                    <div className='flex justify-between gap-4'>
                      <span className='text-emerald-700'>Name:</span>
                      <span className='font-medium text-right'>{foundDiagnosis.name}</span>
                    </div>
                    <div className='flex justify-between gap-4'>
                      <span className='text-emerald-700'>Patient #:</span>
                      <span className='font-medium'>{foundDiagnosis.patientNumber}</span>
                    </div>
                    <div className='flex justify-between gap-4'>
                      <span className='text-emerald-700'>Diagnosis:</span>
                      <span className='font-medium text-right'>{foundDiagnosis.diagnosis}</span>
                    </div>
                    <div className='flex justify-between gap-4'>
                      <span className='text-emerald-700'>Status:</span>
                      <span className='font-medium text-right'>{foundDiagnosis.status}</span>
                    </div>
                  </div>
                </div>
              )}
            </ActionCard>

            {/* Clinical Actions Grid - 2 columns */}
            <div className='grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5 lg:gap-6'>
              <ActionCard title='Record assessment' icon={FiClipboard}>
                <p className='text-xs sm:text-sm text-slate-600 mb-3 sm:mb-4'>
                  Record vitals and health indicators for a patient
                </p>
                <button
                  type='button'
                  onClick={() => setIsAssessmentModalOpen(true)}
                  className='w-full bg-sky-600 text-white text-sm sm:text-base font-semibold py-2.5 sm:py-3 px-3 sm:px-4 rounded-lg hover:bg-sky-700 transition-colors cursor-pointer'
                >
                  Open form
                </button>
              </ActionCard>

              <ActionCard title='Create diagnosis' icon={FiActivity}>
                <p className='text-xs sm:text-sm text-slate-600 mb-3 sm:mb-4'>
                  Document diagnosis and patient disposition
                </p>
                <button
                  type='button'
                  onClick={() => setIsDiagnosisModalOpen(true)}
                  className='w-full bg-emerald-600 text-white text-sm sm:text-base font-semibold py-2.5 sm:py-3 px-3 sm:px-4 rounded-lg hover:bg-emerald-700 transition-colors cursor-pointer'
                >
                  Open form
                </button>
              </ActionCard>
            </div>
          </div>

          {/* Sidebar - 1 column */}
          <div className='lg:col-span-1'>
            <ActionCard title='Register user' icon={FiUserPlus}>
              <p className='text-xs sm:text-sm text-slate-600 mb-3 sm:mb-4'>Add new staff or volunteer</p>
              <button
                type='button'
                onClick={() => setIsUserModalOpen(true)}
                className='w-full bg-slate-900 text-white text-sm sm:text-base font-semibold py-2.5 sm:py-3 px-3 sm:px-4 rounded-lg hover:bg-slate-800 transition-colors cursor-pointer'
              >
                Open form
              </button>
            </ActionCard>
          </div>
        </div>
      </div>

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
