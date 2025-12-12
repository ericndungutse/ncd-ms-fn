import { useState, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import FormGroup from '../../ui/FormGroup';
import FormInput from '../../ui/FormInput';
import FormButton from '../../ui/FormButton';
import { useCreateAssessment, useFetchProfileByPatientNumber } from './assessments.queries';
import { useFetchIndicators } from '../indicators/indicators.queries';
import { useFetchCampaigns } from '../screeningCampaign/campaigns.queries';
import { getResponseData } from '../../utils/axios.utils';

export default function RecordAssessmentForm({ onSuccess }) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors: formErrors },
  } = useForm();

  const [patientNumberInput, setPatientNumberInput] = useState('');
  const [selectedIndicatorId, setSelectedIndicatorId] = useState('');
  const [profileSearched, setProfileSearched] = useState(false);

  const { createAssessment, isPending } = useCreateAssessment();
  const { data: indicators } = useFetchIndicators({ fields: 'name,readings' });
  const { data: campaignsRaw } = useFetchCampaigns();

  // Fetch profile when patient number is entered
  const normalizedPatientNumber = useMemo(() => {
    const trimmed = patientNumberInput.trim();
    if (!trimmed) return '';
    // pad numeric patient numbers to 8 digits (API returns like 00000007)
    return /^[0-9]+$/.test(trimmed) ? trimmed.padStart(8, '0') : trimmed;
  }, [patientNumberInput]);

  const { profile, isLoading: isLoadingProfile, error: profileError } = useFetchProfileByPatientNumber(
    normalizedPatientNumber,
    { enabled: profileSearched }
  );

  // Compute selected indicator
  const selectedIndicator = useMemo(() => {
    if (selectedIndicatorId && indicators) {
      return indicators.find((ind) => ind._id === selectedIndicatorId) || null;
    }
    return null;
  }, [selectedIndicatorId, indicators]);

  const campaigns = useMemo(() => {
    return getResponseData(campaignsRaw)?.data?.campaigns || getResponseData(campaignsRaw)?.data || [];
  }, [campaignsRaw]);

  const handlePatientNumberSearch = () => {
    if (patientNumberInput.trim()) {
      setProfileSearched(true);
    }
  };

  const handleIndicatorChange = (e) => {
    setSelectedIndicatorId(e.target.value);
  };

  const onSubmit = (data) => {
    if (!profile) {
      return;
    }

    // Build readings object
    const readings = {};
    if (selectedIndicator?.readings) {
      selectedIndicator.readings.forEach((reading, idx) => {
        const readingLabel = reading.name || reading.type || `Reading ${idx + 1}`;
        const fieldKey = `reading_${readingLabel}`;
        const value = data[fieldKey];
        if (value) {
          readings[readingLabel] = parseFloat(value);
        }
      });
    }

    // Build assessment payload
    const assessmentData = {
      profile: profile.userId,
      patientNumber: profile.patientNumber,
      ncdcIndicatorId: selectedIndicatorId,
      readings,
      screeningCampaignId: data.screeningCampaignId,
    };

    createAssessment(assessmentData, {
      onSuccess: () => {
        reset();
        setPatientNumberInput('');
        setSelectedIndicatorId('');
        setProfileSearched(false);
        if (onSuccess) {
          onSuccess();
        }
      },
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='space-y-6'>
      {/* Patient Number Search */}
      <div className='space-y-4'>
        <div className='flex gap-3'>
          <div className='flex-1'>
            <FormInput
              label='Patient Number'
              type='text'
              placeholder='Enter patient number'
              value={patientNumberInput}
              onChange={(e) => {
                setPatientNumberInput(e.target.value);
                setProfileSearched(false);
              }}
              required
              required
            />
          </div>
          <div className='flex items-end'>
            <button
              type='button'
              onClick={handlePatientNumberSearch}
              disabled={!patientNumberInput.trim() || isLoadingProfile}
              className='px-4 py-3 bg-sky-600 text-white rounded-lg hover:bg-sky-700 disabled:opacity-50 disabled:cursor-not-allowed font-medium'
            >
              {isLoadingProfile ? 'Searching...' : 'Search'}
            </button>
          </div>
        </div>

        {/* Profile not found / errors */}
        {profileSearched && !profile && profileError && (
          <div className='p-4 border border-rose-200 bg-rose-50 rounded-lg text-sm text-rose-700 font-medium'>
            {profileError}
          </div>
        )}
 
         {/* Patient Info Display */}
         {profile && profileSearched && (
           <div className='p-4 bg-teal-50 border border-teal-200 rounded-lg'>
             <p className='text-sm font-semibold text-teal-900 mb-2'>Patient Found:</p>
             <div className='grid grid-cols-2 gap-2 text-sm'>
               <div>
                 <span className='text-teal-700'>Name:</span>{' '}
                 <span className='font-medium text-teal-900'>
                   {profile.firstName} {profile.lastName}
                 </span>
               </div>
               <div>
                 <span className='text-teal-700'>Phone:</span>{' '}
                 <span className='font-medium text-teal-900'>{profile.phoneNumber}</span>
               </div>
               <div>
                 <span className='text-teal-700'>Address:</span>{' '}
                 <span className='font-medium text-teal-900'>
                   {profile.address?.sector}, {profile.address?.district}
                 </span>
               </div>
             </div>
           </div>
         )}
       </div>
      {/* Only show the rest of the form if profile is found */}
      {profile && profileSearched && (
        <>
          {/* Screening Campaign */}
          <FormGroup label='Screening Campaign' error={formErrors.screeningCampaignId?.message} required>
            <select
              {...register('screeningCampaignId', { required: 'Campaign is required' })}
              className='w-full px-3 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent bg-white text-slate-900'
            >
              <option value=''>Select a campaign</option>
              {campaigns?.map((campaign) => (
                <option key={campaign._id} value={campaign._id}>
                  {campaign.title}
                </option>
              ))}
            </select>
          </FormGroup>

          {/* Indicator */}
          <FormGroup label='Health Indicator' error={formErrors.ncdcIndicatorId?.message} required>
            <select
              value={selectedIndicatorId}
              onChange={handleIndicatorChange}
              className='w-full px-3 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent bg-white text-slate-900'
            >
              <option value=''>Select an indicator</option>
              {indicators?.map((indicator) => (
                <option key={indicator._id} value={indicator._id}>
                  {indicator.name}
                </option>
              ))}
            </select>
          </FormGroup>

          {/* Readings */}
          {selectedIndicator && selectedIndicator.readings && selectedIndicator.readings.length > 0 && (
            <div className='space-y-4'>
              <h3 className='text-sm font-semibold text-slate-700 uppercase tracking-wide'>Readings</h3>
              <div className='grid gap-4 sm:grid-cols-2'>
                {selectedIndicator.readings
                  .filter((reading) => reading && (reading.name || reading.type))
                  .map((reading, idx) => {
                    const readingLabel = reading.name || reading.type || `Reading ${idx + 1}`;
                    const fieldKey = `reading_${readingLabel}`;
                    const placeholder = `Enter ${(readingLabel || '').toLowerCase()}`;
                    return (
                      <FormInput
                        key={fieldKey}
                        label={`${readingLabel}${reading.unit ? ` (${reading.unit})` : ''}`}
                        type='number'
                        step='any'
                        placeholder={placeholder}
                        {...register(fieldKey, {
                          required: `${readingLabel} is required`,
                          min: {
                            value: reading.min ?? 0,
                            message: `Minimum value is ${reading.min ?? 0}`,
                          },
                          max: {
                            value: reading.max ?? 1000,
                            message: `Maximum value is ${reading.max ?? 1000}`,
                          },
                        })}
                        error={formErrors[fieldKey]?.message}
                        required
                      />
                    );
                  })}
              </div>
            </div>
          )}

          {/* Submit Button */}
          <div className='flex gap-3 pt-4'>
            <FormButton type='submit' disabled={isPending || !selectedIndicatorId}>
              {isPending ? 'Recording...' : 'Record Assessment'}
            </FormButton>
            <button
              type='button'
              onClick={() => {
                reset();
                setPatientNumberInput('');
                setSelectedIndicatorId('');
                setProfileSearched(false);
              }}
              className='px-6 py-3 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 font-medium'
            >
              Reset
            </button>
          </div>
        </>
      )}
    </form>
  );
}
