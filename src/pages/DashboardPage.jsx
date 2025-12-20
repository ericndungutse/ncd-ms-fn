import { useState } from 'react';
import {
  FiActivity,
  FiClipboard,
  FiSearch,
  FiUserPlus,
  FiAlertCircle,
  FiLoader,
  FiUsers,
  FiTrendingUp,
  FiMapPin,
} from 'react-icons/fi';
import { Link } from 'react-router-dom';
import RegisterUserForm from '../features/users/RegisterUserForm';
import RecordAssessmentForm from '../features/assessments/RecordAssessmentForm';
import CreateDiagnosisForm from '../features/diagnosis/CreateDiagnosisForm';
import FormInput from '../ui/FormInput';
import Modal from '../ui/Modal';
import { getProfileByPatientNumber } from '../service/assessments.service';
import { getDiagnosisByPatientNumber } from '../service/diagnosis.service';
import { getErrorMessage } from '../utils/axios.utils';
import { useAuth } from '../features/auth/auth.hooks';

function StatCard({ title, value, icon: Icon, trend, color = 'sky' }) {
  const colorClasses = {
    sky: 'bg-sky-50 text-sky-600',
    emerald: 'bg-emerald-50 text-emerald-600',
    purple: 'bg-purple-50 text-purple-600',
    amber: 'bg-amber-50 text-amber-600',
  };

  return (
    <div className='bg-white rounded-xl border border-slate-200 p-5 hover:shadow-sm transition-shadow'>
      <div className='flex items-start justify-between'>
        <div className='flex-1'>
          <p className='text-sm font-medium text-slate-600 mb-1'>{title}</p>
          <p className='text-2xl font-bold text-slate-900'>{value}</p>
          {trend && (
            <div className='flex items-center gap-1 mt-2'>
              <FiTrendingUp className='w-3 h-3 text-emerald-600' />
              <span className='text-xs text-emerald-600 font-medium'>{trend}</span>
            </div>
          )}
        </div>
        <div className={`w-12 h-12 rounded-lg ${colorClasses[color]} flex items-center justify-center`}>
          <Icon className='w-6 h-6' />
        </div>
      </div>
    </div>
  );
}

function QuickActionButton({ title, description, icon: Icon, onClick, color = 'sky' }) {
  const colorClasses = {
    sky: 'border-sky-200 hover:border-sky-300 hover:bg-sky-50',
    emerald: 'border-emerald-200 hover:border-emerald-300 hover:bg-emerald-50',
    blue: 'border-blue-200 hover:border-blue-300 hover:bg-blue-50',
  };

  const iconColorClasses = {
    sky: 'bg-sky-100 text-sky-600',
    emerald: 'bg-emerald-100 text-emerald-600',
    blue: 'bg-blue-100 text-blue-600',
  };

  return (
    <button
      onClick={onClick}
      className={`w-full text-left bg-white border rounded-xl p-4 transition-all ${colorClasses[color]}`}
    >
      <div className='flex items-start gap-3'>
        <div className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${iconColorClasses[color]}`}>
          <Icon className='w-5 h-5' />
        </div>
        <div>
          <div className='font-semibold text-slate-900 mb-0.5'>{title}</div>
          <div className='text-xs text-slate-600'>{description}</div>
        </div>
      </div>
    </button>
  );
}

export default function DashboardPage() {
  const { isAdmin, isAdmissionStaff, isScreeningVolunteer, user } = useAuth();
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
    <div className='min-h-screen bg-linear-to-br from-slate-50 to-slate-100 p-4 sm:p-6 lg:p-8'>
      <div className='max-w-7xl mx-auto space-y-6'>
        {/* Header */}
        <div>
          <h1 className='text-3xl font-bold text-slate-900'>
            Welcome back{user?.firstName ? `, ${user.firstName}` : ''}
          </h1>
          <p className='text-slate-600 mt-1'>Here's what's happening with your healthcare system today</p>
        </div>

        {/* Stats Overview - Admin Only */}
        {isAdmin && (
          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4'>
            <StatCard title='Total Patients' value='1,234' icon={FiUsers} trend='+12% this month' color='sky' />
            <StatCard title='Active Campaigns' value='8' icon={FiMapPin} color='emerald' />
            <StatCard
              title='Assessments Today'
              value='45'
              icon={FiClipboard}
              trend='+8% from yesterday'
              color='purple'
            />
            <StatCard title='Pending Diagnosis' value='23' icon={FiActivity} color='amber' />
          </div>
        )}

        {/* Main Content Grid */}
        <div className='grid grid-cols-1 lg:grid-cols-3 gap-6'>
          {/* Left Column - Quick Actions */}
          <div className='lg:col-span-1 space-y-4'>
            <div className='bg-white rounded-xl border border-slate-200 p-5'>
              <h2 className='text-lg font-semibold text-slate-900 mb-4'>Quick Actions</h2>
              <div className='space-y-3'>
                {(isAdmin || isScreeningVolunteer) && (
                  <QuickActionButton
                    title='Record Assessment'
                    description='Capture patient vitals'
                    icon={FiClipboard}
                    onClick={() => setIsAssessmentModalOpen(true)}
                    color='sky'
                  />
                )}
                {(isAdmin || isAdmissionStaff) && (
                  <QuickActionButton
                    title='Create Diagnosis'
                    description='Assign required assessments'
                    icon={FiActivity}
                    onClick={() => setIsDiagnosisModalOpen(true)}
                    color='emerald'
                  />
                )}
                {(isAdmin || isAdmissionStaff || isScreeningVolunteer) && (
                  <QuickActionButton
                    title='Register Patient'
                    description='Add new patient record'
                    icon={FiUserPlus}
                    onClick={() => setIsUserModalOpen(true)}
                    color='blue'
                  />
                )}
              </div>
            </div>

            {/* Navigation Links */}
            <div className='bg-white rounded-xl border border-slate-200 p-5'>
              <h2 className='text-lg font-semibold text-slate-900 mb-4'>Navigate To</h2>
              <div className='space-y-2'>
                {isAdmin && (
                  <Link
                    to='/assessments'
                    className='flex items-center gap-3 p-3 rounded-lg hover:bg-slate-50 transition-colors group'
                  >
                    <FiClipboard className='w-5 h-5 text-slate-400 group-hover:text-sky-600' />
                    <span className='text-sm font-medium text-slate-700 group-hover:text-slate-900'>
                      All Assessments
                    </span>
                  </Link>
                )}
                <Link
                  to='/campaigns'
                  className='flex items-center gap-3 p-3 rounded-lg hover:bg-slate-50 transition-colors group'
                >
                  <FiMapPin className='w-5 h-5 text-slate-400 group-hover:text-emerald-600' />
                  <span className='text-sm font-medium text-slate-700 group-hover:text-slate-900'>
                    Screening Campaigns
                  </span>
                </Link>
                <Link
                  to='/indicators'
                  className='flex items-center gap-3 p-3 rounded-lg hover:bg-slate-50 transition-colors group'
                >
                  <FiActivity className='w-5 h-5 text-slate-400 group-hover:text-purple-600' />
                  <span className='text-sm font-medium text-slate-700 group-hover:text-slate-900'>
                    Health Indicators
                  </span>
                </Link>
                {isAdmin && (
                  <Link
                    to='/users'
                    className='flex items-center gap-3 p-3 rounded-lg hover:bg-slate-50 transition-colors group'
                  >
                    <FiUsers className='w-5 h-5 text-slate-400 group-hover:text-blue-600' />
                    <span className='text-sm font-medium text-slate-700 group-hover:text-slate-900'>
                      User Management
                    </span>
                  </Link>
                )}
              </div>
            </div>
          </div>

          {/* Right Column - Search Functions */}
          <div className='lg:col-span-2 space-y-6'>
            {/* Patient Search */}
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
                <div className='mt-4 bg-gradient-to-br from-slate-50 to-slate-100 border border-slate-200 rounded-xl p-5'>
                  <div className='flex items-start justify-between mb-4'>
                    <div>
                      <h3 className='text-lg font-bold text-slate-900'>
                        {patientProfile.firstName} {patientProfile.lastName}
                      </h3>
                      <p className='text-sm text-slate-600'>Patient #{patientProfile.patientNumber}</p>
                    </div>
                    <span className='px-3 py-1 bg-emerald-100 text-emerald-700 text-xs font-semibold rounded-full'>
                      Active
                    </span>
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

            {/* Diagnosis Search */}
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
                <div className='mt-4 bg-gradient-to-br from-emerald-50 to-teal-50 border border-emerald-200 rounded-xl p-5'>
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
