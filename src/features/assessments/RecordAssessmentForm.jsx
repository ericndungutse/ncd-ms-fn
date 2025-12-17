import { useState, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import FormGroup from '../../ui/FormGroup';
import FormInput from '../../ui/FormInput';
import FormButton from '../../ui/FormButton';
import { useCreateAssessment } from './assessments.queries';
import { useFetchIndicators } from '../indicators/indicators.queries';
import { useFetchCampaigns } from '../screeningCampaign/campaigns.queries';
import { getDiagnosisByPatientNumber } from '../../service/diagnosis.service';
import { FiAlertCircle, FiCheckCircle } from 'react-icons/fi';
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
  const [diagnosisData, setDiagnosisData] = useState(null);
  const [diagnosisLoading, setDiagnosisLoading] = useState(false);
  const [diagnosisError, setDiagnosisError] = useState('');

  const { createAssessment, isPending } = useCreateAssessment();
  const { data: indicators } = useFetchIndicators({ fields: 'name,readings' });
  const { data: campaignsRaw } = useFetchCampaigns();

  // Fetch profile when patient number is entered
  // Legacy profile search removed; we rely solely on diagnosis lookup
  const isLoadingProfile = false;
  const profile = null;
  const profileError = null;

  // Compute selected indicator
  const selectedIndicator = useMemo(() => {
    if (selectedIndicatorId && indicators) {
      return indicators.find((ind) => ind._id === selectedIndicatorId) || null;
    }
    return null;
  }, [selectedIndicatorId, indicators]);

  // Indicators available for selection: if diagnosis has pending required assessments,
  // show only those pending indicators; otherwise show all indicators
  const availableIndicators = useMemo(() => {
    if (!indicators) return [];
    const pendingNames = (diagnosisData?.requiredAssessments || [])
      .filter((a) => !a.taken)
      .map((a) => a.indicator?.name)
      .filter(Boolean);
    if (pendingNames.length > 0) {
      return indicators.filter((ind) => pendingNames.includes(ind.name));
    }
    return indicators;
  }, [indicators, diagnosisData]);

  const hasPendingRequired = useMemo(() => {
    return (diagnosisData?.requiredAssessments || []).some((a) => !a.taken);
  }, [diagnosisData]);

  const campaigns = useMemo(() => {
    return getResponseData(campaignsRaw)?.data?.campaigns || getResponseData(campaignsRaw)?.data || [];
  }, [campaignsRaw]);

  const handlePatientNumberSearch = async () => {
    const trimmed = patientNumberInput.trim();
    if (!trimmed) return;

    try {
      setDiagnosisLoading(true);
      setDiagnosisError('');
      setDiagnosisData(null);
      setProfileSearched(false);

      // Search for diagnosis only
      const response = await getDiagnosisByPatientNumber(trimmed);
      const diagnosis = response?.data?.data?.diagnosis || response?.data?.diagnosis || response?.data;

      if (diagnosis) {
        setDiagnosisData(diagnosis);
        // Check if all required assessments are taken
        const allTaken = diagnosis.requiredAssessments?.every((a) => a.taken) ?? false;
        if (allTaken && diagnosis.requiredAssessments?.length > 0) {
          setDiagnosisError(
            'All required assessments for this diagnosis have been completed. Cannot record additional assessments.'
          );
          return;
        }
        // Diagnosis found and has pending assessments - proceed
        setProfileSearched(true);
      } else {
        setDiagnosisError('No diagnosis found for this patient number');
      }
    } catch (err) {
      setDiagnosisError(err?.response?.data?.message || 'Error checking diagnosis');
    } finally {
      setDiagnosisLoading(false);
    }
  };

  const handleIndicatorChange = (e) => {
    setSelectedIndicatorId(e.target.value);
  };

  const onSubmit = (data) => {
    if (!diagnosisData) {
      return;
    }

    // Check if diagnosis has all assessments taken
    const allTaken = diagnosisData.requiredAssessments?.every((a) => a.taken) ?? false;
    if (allTaken && diagnosisData.requiredAssessments?.length > 0) {
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
      profile: diagnosisData.profileId?._id,
      patientNumber: diagnosisData.patientNumber,
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
              label='Patient Number (to find diagnosis)'
              type='text'
              placeholder='Enter patient number'
              value={patientNumberInput}
              onChange={(e) => {
                setPatientNumberInput(e.target.value);
                setProfileSearched(false);
              }}
              required
            />
          </div>
          <div className='flex items-end'>
            <button
              type='button'
              onClick={handlePatientNumberSearch}
              disabled={!patientNumberInput.trim() || diagnosisLoading}
              className='px-4 py-3 bg-sky-600 text-white rounded-lg hover:bg-sky-700 disabled:opacity-50 disabled:cursor-not-allowed font-medium'
            >
              {diagnosisLoading ? 'Checking Diagnosis...' : 'Search Diagnosis'}
            </button>
          </div>
        </div>

        {/* Diagnosis Error - All assessments complete */}
        {diagnosisError && (
          <div className='rounded-xl border border-amber-200 bg-amber-50 p-4'>
            <div className='flex items-start gap-3'>
              <FiAlertCircle className='w-5 h-5 text-amber-700 shrink-0' />
              <div>
                <p className='text-sm font-semibold text-amber-900'>Assessment Requirements Complete</p>
                <p className='text-xs sm:text-sm text-amber-800 mt-1'>Diagnosis Status: {diagnosisError}</p>
              </div>
            </div>
            {diagnosisData && diagnosisData.requiredAssessments && diagnosisData.requiredAssessments.length > 0 && (
              <div className='mt-3'>
                <p className='text-sm font-medium text-amber-900'>Completed Assessments</p>
                <ul className='mt-2 space-y-2'>
                  {diagnosisData.requiredAssessments.map((a, idx) => (
                    <li
                      key={idx}
                      className='flex items-start justify-between gap-3 bg-white rounded-lg border border-amber-100 px-3 py-2'
                    >
                      <div className='flex items-center gap-2'>
                        <FiCheckCircle className='w-4 h-4 text-green-600 shrink-0' />
                        <span className='text-slate-900 text-xs sm:text-sm font-medium'>
                          {a.indicator?.name || 'Unknown'}
                        </span>
                      </div>
                      {a.assessmentId?.classification && (
                        <span className='text-xs sm:text-sm text-amber-700'>{a.assessmentId.classification}</span>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}

        {/* Profile search removed */}

        {/* Diagnosis Info Display */}
        {diagnosisData && profileSearched && (
          <div className='p-4 bg-emerald-50 border border-emerald-200 rounded-lg'>
            <p className='text-sm font-semibold text-emerald-900 mb-2'>Diagnosis Found:</p>
            <div className='grid grid-cols-2 gap-2 text-sm'>
              <div>
                <span className='text-emerald-700'>Patient:</span>{' '}
                <span className='font-medium text-emerald-900'>
                  {diagnosisData.profileId?.firstName} {diagnosisData.profileId?.lastName}
                </span>
              </div>
              <div>
                <span className='text-emerald-700'>Patient #:</span>{' '}
                <span className='font-medium text-emerald-900'>{diagnosisData.patientNumber}</span>
              </div>
              <div>
                <span className='text-emerald-700'>Status:</span>{' '}
                <span className='font-medium text-emerald-900 capitalize'>{diagnosisData.status}</span>
              </div>
            </div>
            {diagnosisData.requiredAssessments && diagnosisData.requiredAssessments.length > 0 && (
              <div className='mt-4 pt-4 border-t border-emerald-200'>
                <p className='text-sm font-semibold text-emerald-900 mb-2'>Required Assessments:</p>
                <div className='space-y-2'>
                  {diagnosisData.requiredAssessments.map((assessment, idx) => (
                    <div key={idx} className='flex items-center justify-between text-xs'>
                      <span className='text-emerald-700'>{assessment.indicator?.name || 'Unknown'}</span>
                      <span
                        className={`px-2 py-1 rounded font-medium ${
                          assessment.taken ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'
                        }`}
                      >
                        {assessment.taken ? 'Done' : 'Pending'}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
      {/* Only show the rest of the form if diagnosis is found */}
      {diagnosisData && profileSearched && (
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
              {availableIndicators?.map((indicator) => (
                <option key={indicator._id} value={indicator._id}>
                  {indicator.name}
                </option>
              ))}
            </select>
            {hasPendingRequired && (
              <p className='mt-2 text-xs text-slate-600'>Only pending required indicators are shown.</p>
            )}
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
