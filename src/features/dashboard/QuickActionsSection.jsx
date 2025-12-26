import { useState } from 'react';
import { FiActivity, FiClipboard, FiDatabase, FiMapPin, FiUserPlus } from 'react-icons/fi';
import { QuickActionButton } from './QuickActionButton';
import { RegisterUserForm } from '../users';
import Modal from '../../ui/Modal';
import { RecordAssessmentForm } from '../assessments';
import CreateDiagnosisForm from '../diagnosis/CreateDiagnosisForm';
import RequireRole from '../../ui/RequireRole';

export default function QuickActionsSection() {
  const [isUserModalOpen, setIsUserModalOpen] = useState(false);
  const [isAssessmentModalOpen, setIsAssessmentModalOpen] = useState(false);
  const [isDiagnosisModalOpen, setIsDiagnosisModalOpen] = useState(false);

  return (
    <section className='bg-white rounded-xl border border-slate-200 p-5'>
      <h2 className='text-lg font-semibold text-slate-900 mb-4'>Quick Actions</h2>
      <div className='space-y-3'>
        <QuickActionButton
          title='Register Patient'
          description='Add new patient record'
          icon={FiUserPlus}
          onClick={() => setIsUserModalOpen(true)}
          color='blue'
        />
        <QuickActionButton
          title='Create Screening'
          description='Assign required assessments'
          icon={FiActivity}
          onClick={() => setIsDiagnosisModalOpen(true)}
          color='emerald'
        />

        <RequireRole allowedRoles={['screening volunteer']}>
          <QuickActionButton
            title='Record Assessment'
            description='Capture patient vitals'
            icon={FiClipboard}
            onClick={() => setIsAssessmentModalOpen(true)}
            color='sky'
          />
        </RequireRole>
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
        title='Create Screening'
        description='Create a screening for a patient'
        size='lg'
      >
        <CreateDiagnosisForm
          mode='modal'
          onSuccess={() => setIsDiagnosisModalOpen(false)}
          onCancel={() => setIsDiagnosisModalOpen(false)}
        />
      </Modal>
    </section>
  );
}
