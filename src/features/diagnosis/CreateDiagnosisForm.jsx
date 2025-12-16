import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import { FiSearch } from 'react-icons/fi';
import { useFetchIndicators } from '../indicators/indicators.queries';
import { getProfileByPatientNumber } from '../../service/assessments.service';
import { createDiagnosis } from '../../service/diagnosis.service';
import FormInput from '../../ui/FormInput';

export default function CreateDiagnosisForm({ mode = 'page', onSuccess, onCancel }) {
  const isModal = mode === 'modal';
  const [patientProfile, setPatientProfile] = useState(null);
  const [searchError, setSearchError] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [selectedIndicators, setSelectedIndicators] = useState([]);

  const { data: indicators } = useFetchIndicators();

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      patientNumber: '',
    },
  });

  const patientNumber = watch('patientNumber');

  const { mutate: submitDiagnosis, isPending } = useMutation({
    mutationFn: createDiagnosis,
    onSuccess: () => {
      if (isModal) {
        reset();
        setPatientProfile(null);
        setSelectedIndicators([]);
        onSuccess?.();
      }
    },
    onError: (error) => {
      console.error('Failed to create diagnosis:', error);
    },
  });

  const handleSearchPatient = async () => {
    if (!patientNumber.trim()) {
      setSearchError('Please enter a patient number');
      return;
    }

    setIsSearching(true);
    setSearchError('');

    try {
      const response = await getProfileByPatientNumber(patientNumber.trim());
      setPatientProfile(response.data?.data);
      setSearchError('');
    } catch (error) {
      setSearchError(error.response?.data?.message || 'Patient not found');
      setPatientProfile(null);
    } finally {
      setIsSearching(false);
    }
  };

  const toggleIndicator = (indicatorId) => {
    setSelectedIndicators((prev) => {
      if (prev.includes(indicatorId)) {
        return prev.filter((id) => id !== indicatorId);
      }
      return [...prev, indicatorId];
    });
  };

  const onSubmit = () => {
    if (!patientProfile) {
      setSearchError('Please search for a patient first');
      return;
    }

    if (selectedIndicators.length === 0) {
      return;
    }

    const requiredAssessments = selectedIndicators.map((indicator) => ({
      indicator,
      taken: false,
    }));

    submitDiagnosis({
      patientNumber: patientNumber.trim(),
      requiredAssessments,
    });
  };

  return (
    <div className='h-full'>
      <div className={isModal ? '' : 'max-w-4xl mx-auto bg-white rounded-lg shadow-sm p-5 sm:p-6'}>
        {!isModal && (
          <div className='mb-5 sm:mb-6'>
            <h1 className='text-xl sm:text-2xl font-bold text-slate-900'>Create Diagnosis</h1>
            <p className='text-xs sm:text-sm text-slate-600 mt-1'>Search patient and assign required assessments</p>
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className='space-y-5 sm:space-y-6'>
          {/* Patient Search */}
          <div className='space-y-3 sm:space-y-4'>
            <h3 className='text-sm sm:text-base font-semibold text-slate-900'>Patient Information</h3>
            <div className='flex gap-2 sm:gap-3'>
              <div className='flex-1'>
                <FormInput
                  label='Patient Number'
                  id='patientNumber'
                  type='text'
                  placeholder='Enter patient number'
                  register={register}
                  registerOptions={{
                    required: 'Patient number is required',
                  }}
                  error={errors.patientNumber}
                />
              </div>
              <button
                type='button'
                onClick={handleSearchPatient}
                disabled={isSearching || !patientNumber}
                className='mt-6 px-4 sm:px-5 py-2.5 sm:py-3 bg-sky-700 text-white rounded-lg hover:bg-sky-800 disabled:bg-slate-300 disabled:cursor-not-allowed transition-colors flex items-center gap-2 text-xs sm:text-sm font-semibold cursor-pointer'
              >
                <FiSearch className='w-4 h-4' />
                {isSearching ? 'Searching...' : 'Search'}
              </button>
            </div>

            {searchError && (
              <div className='bg-rose-50 border border-rose-200 text-rose-700 px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg text-xs sm:text-sm'>
                {searchError}
              </div>
            )}

            {patientProfile && (
              <div className='bg-emerald-50 border border-emerald-200 rounded-lg p-3 sm:p-4'>
                <div className='text-xs sm:text-sm space-y-1'>
                  <p className='font-semibold text-emerald-900'>
                    {patientProfile.firstName} {patientProfile.lastName}
                  </p>
                  <p className='text-emerald-700'>Patient Number: {patientProfile.patientNumber}</p>
                  <p className='text-emerald-700'>Date of Birth: {patientProfile.dateOfBirth}</p>
                </div>
              </div>
            )}
          </div>

          {/* Required Assessments */}
          <div className='space-y-3 sm:space-y-4'>
            <h3 className='text-sm sm:text-base font-semibold text-slate-900'>
              Required Assessments
              <span className='text-rose-600 ml-1'>*</span>
            </h3>

            {indicators.length === 0 ? (
              <div className='bg-slate-50 border border-slate-200 rounded-lg p-4 sm:p-5 text-center'>
                <p className='text-xs sm:text-sm text-slate-600'>No indicators available.</p>
              </div>
            ) : (
              <div className='bg-white border border-slate-200 rounded-lg p-3 sm:p-4 max-h-64 overflow-y-auto'>
                <div className='space-y-2.5'>
                  {indicators.map((indicator) => (
                    <label
                      key={indicator._id}
                      className='flex items-start gap-3 p-2.5 sm:p-3 rounded-lg hover:bg-slate-50 transition-colors cursor-pointer'
                    >
                      <input
                        type='checkbox'
                        checked={selectedIndicators.includes(indicator._id)}
                        onChange={() => toggleIndicator(indicator._id)}
                        className='mt-0.5 w-4 h-4 text-sky-700 border-slate-300 rounded focus:ring-sky-600 cursor-pointer'
                      />
                      <div className='flex-1'>
                        <p className='text-xs sm:text-sm font-medium text-slate-900'>{indicator.name}</p>
                        {indicator.description && (
                          <p className='text-xs text-slate-600 mt-0.5'>{indicator.description}</p>
                        )}
                      </div>
                    </label>
                  ))}
                </div>
              </div>
            )}

            {selectedIndicators.length > 0 && (
              <div className='bg-sky-50 border border-sky-200 rounded-lg p-3 sm:p-4'>
                <p className='text-xs sm:text-sm font-medium text-sky-900'>
                  {selectedIndicators.length} indicator{selectedIndicators.length !== 1 ? 's' : ''} selected
                </p>
              </div>
            )}
          </div>

          {/* Submit Buttons */}
          <div className='flex flex-col sm:flex-row gap-2 sm:gap-3 pt-1'>
            <button
              type='submit'
              disabled={isPending || !patientProfile || selectedIndicators.length === 0}
              className='flex-1 rounded-lg bg-sky-700 px-4 sm:px-6 py-2.5 sm:py-3 text-xs sm:text-sm font-semibold text-white hover:bg-sky-800 disabled:bg-slate-300 disabled:cursor-not-allowed transition-all cursor-pointer'
            >
              {isPending ? 'Creating Diagnosis...' : 'Create Diagnosis'}
            </button>
            <button
              type='button'
              onClick={() => {
                reset();
                setPatientProfile(null);
                setSearchError('');
                setSelectedIndicators([]);
              }}
              disabled={isPending}
              className='rounded-lg border border-slate-300 px-4 sm:px-6 py-2.5 sm:py-3 text-xs sm:text-sm font-semibold text-slate-700 hover:bg-slate-50 hover:border-slate-400 transition-all disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer'
            >
              Clear
            </button>
            {isModal && (
              <button
                type='button'
                onClick={onCancel}
                className='rounded-lg border border-slate-300 px-4 sm:px-6 py-2.5 sm:py-3 text-xs sm:text-sm font-semibold text-slate-700 hover:bg-slate-50 hover:border-slate-400 transition-all cursor-pointer'
              >
                Close
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
