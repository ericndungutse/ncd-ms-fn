import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import { useCreateCampaign } from '../screeningCampaign/campaigns.queries';
import { getErrorMessage } from '../../utils/axios.utils';
import { RWANDA_LOCATIONS } from '../../utils/locations';
import FormInput from '../../ui/FormInput';

export default function CreateCampaignForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    reset,
    setError,
  } = useForm({
    defaultValues: {
      title: '',
      description: '',
      startDate: '',
      endDate: '',
      startTime: '08:00',
      endTime: '17:00',
      location: '',
      province: '',
      district: '',
      sector: '',
      cell: '',
      village: '',
    },
  });

  const { isPending, createCampaignMutation, error } = useCreateCampaign();
  const [selectedProvince, setSelectedProvince] = useState('');
  const [districts, setDistricts] = useState([]);
  const [sectors, setSectors] = useState([]);

  const handleProvinceChange = (e) => {
    const province = e.target.value;
    setSelectedProvince(province);
    const provinceData = RWANDA_LOCATIONS[province];
    setDistricts(provinceData ? Object.keys(provinceData.districts) : []);
    setSectors([]);
  };

  const handleDistrictChange = (e) => {
    const district = e.target.value;
    const provinceData = RWANDA_LOCATIONS[selectedProvince];
    setSectors(provinceData?.districts[district] || []);
  };

  const onSubmit = async (data) => {
    // Transform data to match API payload structure
    const payload = {
      title: data.title,
      description: data.description,
      startDate: data.startDate,
      endDate: data.endDate,
      startTime: data.startTime,
      endTime: data.endTime,
      location: data.location,
      address: {
        province: data.province,
        district: data.district,
        sector: data.sector,
        cell: data.cell,
        village: data.village,
      },
    };

    createCampaignMutation(payload, {
      onError: (error) => {
        const errorData = error?.response?.data;

        if (errorData?.errors) {
          // Map API field errors to form fields
          Object.entries(errorData.errors).forEach(([field, message]) => {
            // Handle nested address fields (e.g., "address.province" -> "province")
            const fieldName = field.startsWith('address.') ? field.replace('address.', '') : field;

            setError(fieldName, {
              type: 'manual',
              message: message,
            });
          });
        }
      },
    });
  };

  return (
    <div className='max-w-4xl mx-auto space-y-6 animate-fade-in'>
      {/* Breadcrumb Navigation */}
      <div className='flex items-center gap-3'>
        <Link
          to='/campaigns'
          className='inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50 hover:border-slate-300 transition-all shadow-sm hover:shadow'
        >
          <FiArrowLeft className='h-4 w-4' /> Back to Campaigns
        </Link>
      </div>

      {/* Form Container */}
      <div className='rounded-lg border border-slate-200 bg-white p-6 shadow-sm'>
        <div className='mb-6'>
          <h2 className='text-2xl font-semibold text-slate-900'>Create Screening Campaign</h2>
          <p className='mt-1 text-sm text-slate-600'>Plan and schedule a new NCD screening campaign</p>
        </div>

        {error && !error?.response?.data?.errors && (
          <div className='mb-6 rounded-lg border border-rose-200 bg-rose-50 p-4 text-sm text-rose-700 font-medium'>
            {getErrorMessage(error)}
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className='space-y-5'>
          {/* Campaign Title */}
          <FormInput
            label='Campaign Title'
            id='title'
            type='text'
            placeholder='e.g., NCDC Screening Campaign Nyarugenge District'
            register={register}
            registerOptions={{
              required: 'Campaign title is required',
              minLength: {
                value: 3,
                message: 'Title must be at least 3 characters',
              },
            }}
            error={errors.title}
          />

          {/* Description */}
          <div className='group'>
            <label
              htmlFor='description'
              className='block text-sm font-semibold text-slate-900 mb-2 transition-colors group-focus-within:text-sky-700'
            >
              Description
            </label>
            <textarea
              {...register('description')}
              id='description'
              placeholder='Describe the purpose and scope of this campaign...'
              rows='4'
              className='w-full px-4 py-2.5 border rounded-lg text-slate-900 text-sm font-medium focus:outline-none transition-all shadow-sm border-slate-200 bg-white hover:border-slate-300 focus:border-sky-600 focus:ring-2 focus:ring-sky-100 hover:shadow resize-none'
            />
          </div>

          {/* Dates */}
          <div className='grid gap-4 sm:grid-cols-2'>
            <FormInput
              label='Start Date'
              id='startDate'
              type='date'
              register={register}
              registerOptions={{
                required: 'Start date is required',
              }}
              error={errors.startDate}
            />

            <FormInput
              label='End Date'
              id='endDate'
              type='date'
              register={register}
              registerOptions={{
                required: 'End date is required',
                validate: (value) => {
                  const startDate = getValues('startDate');
                  return !startDate || new Date(value) > new Date(startDate) || 'End date must be after start date';
                },
              }}
              error={errors.endDate}
            />
          </div>

          {/* Times */}
          <div className='grid gap-4 sm:grid-cols-2'>
            <FormInput label='Start Time' id='startTime' type='time' register={register} error={errors.startTime} />

            <FormInput label='End Time' id='endTime' type='time' register={register} error={errors.endTime} />
          </div>

          {/* Location Name */}
          <FormInput
            label='Location Name'
            id='location'
            type='text'
            placeholder='e.g., Kigali University Teaching Hospital (CHUK)'
            register={register}
            error={errors.location}
          />

          {/* Address Section */}
          <div className='space-y-4 rounded-lg bg-slate-50 border border-slate-200 p-5'>
            <h3 className='text-sm font-semibold text-slate-900'>Campaign Address</h3>

            {/* Province */}
            <div>
              <label htmlFor='province' className='block text-sm font-semibold text-slate-900 mb-2'>
                Province
                <span className='text-rose-600 ml-1'>*</span>
              </label>
              <select
                {...register('province', {
                  required: 'Province is required',
                  onChange: handleProvinceChange,
                })}
                id='province'
                className={`w-full px-4 py-2.5 border rounded-lg text-slate-900 text-sm font-medium focus:outline-none transition-all shadow-sm ${
                  errors.province
                    ? 'border-rose-300 bg-rose-50 focus:ring-2 focus:ring-rose-100 focus:border-rose-500'
                    : 'border-slate-200 bg-white hover:border-slate-300 focus:border-sky-600 focus:ring-2 focus:ring-sky-100'
                }`}
              >
                <option value=''>Select province</option>
                {Object.keys(RWANDA_LOCATIONS).map((province) => (
                  <option key={province} value={province}>
                    {province}
                  </option>
                ))}
              </select>
              {errors.province && (
                <div className='flex items-center gap-2 mt-2' role='alert'>
                  <svg className='w-4 h-4 text-rose-600 shrink-0' fill='currentColor' viewBox='0 0 20 20'>
                    <path
                      fillRule='evenodd'
                      d='M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z'
                      clipRule='evenodd'
                    />
                  </svg>
                  <p className='text-rose-700 text-sm font-semibold'>{errors.province.message}</p>
                </div>
              )}
            </div>

            {/* District */}
            {districts.length > 0 && (
              <div>
                <label htmlFor='district' className='block text-sm font-semibold text-slate-900 mb-2'>
                  District
                  <span className='text-rose-600 ml-1'>*</span>
                </label>
                <select
                  {...register('district', {
                    required: 'District is required',
                    onChange: handleDistrictChange,
                  })}
                  id='district'
                  className={`w-full px-4 py-2.5 border rounded-lg text-slate-900 text-sm font-medium focus:outline-none transition-all shadow-sm ${
                    errors.district
                      ? 'border-rose-300 bg-rose-50 focus:ring-2 focus:ring-rose-100 focus:border-rose-500'
                      : 'border-slate-200 bg-white hover:border-slate-300 focus:border-sky-600 focus:ring-2 focus:ring-sky-100'
                  }`}
                >
                  <option value=''>Select district</option>
                  {districts.map((district) => (
                    <option key={district} value={district}>
                      {district}
                    </option>
                  ))}
                </select>
                {errors.district && (
                  <div className='flex items-center gap-2 mt-2' role='alert'>
                    <svg className='w-4 h-4 text-rose-600 shrink-0' fill='currentColor' viewBox='0 0 20 20'>
                      <path
                        fillRule='evenodd'
                        d='M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z'
                        clipRule='evenodd'
                      />
                    </svg>
                    <p className='text-rose-700 text-sm font-semibold'>{errors.district.message}</p>
                  </div>
                )}
              </div>
            )}

            {/* Sector */}
            {sectors.length > 0 && (
              <div>
                <label htmlFor='sector' className='block text-sm font-semibold text-slate-900 mb-2'>
                  Sector
                  <span className='text-rose-600 ml-1'>*</span>
                </label>
                <select
                  {...register('sector', {
                    required: 'Sector is required',
                  })}
                  id='sector'
                  className={`w-full px-4 py-2.5 border rounded-lg text-slate-900 text-sm font-medium focus:outline-none transition-all shadow-sm ${
                    errors.sector
                      ? 'border-rose-300 bg-rose-50 focus:ring-2 focus:ring-rose-100 focus:border-rose-500'
                      : 'border-slate-200 bg-white hover:border-slate-300 focus:border-sky-600 focus:ring-2 focus:ring-sky-100'
                  }`}
                >
                  <option value=''>Select sector</option>
                  {sectors.map((sector) => (
                    <option key={sector} value={sector}>
                      {sector}
                    </option>
                  ))}
                </select>
                {errors.sector && (
                  <div className='flex items-center gap-2 mt-2' role='alert'>
                    <svg className='w-4 h-4 text-rose-600 shrink-0' fill='currentColor' viewBox='0 0 20 20'>
                      <path
                        fillRule='evenodd'
                        d='M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z'
                        clipRule='evenodd'
                      />
                    </svg>
                    <p className='text-rose-700 text-sm font-semibold'>{errors.sector.message}</p>
                  </div>
                )}
              </div>
            )}

            {/* Cell */}
            <FormInput
              label='Cell'
              id='cell'
              type='text'
              placeholder='e.g., Kiyovu'
              register={register}
              error={errors.cell}
            />

            {/* Village */}
            <FormInput
              label='Village'
              id='village'
              type='text'
              placeholder='e.g., Kiyovu Village'
              register={register}
              error={errors.village}
            />
          </div>

          {/* Submit Buttons */}
          <div className='flex gap-3 pt-2'>
            <button
              type='submit'
              disabled={isPending}
              className='flex-1 rounded-lg bg-sky-700 px-6 py-3 text-sm font-semibold text-white hover:bg-sky-800 disabled:bg-slate-300 disabled:cursor-not-allowed transition-all shadow-sm hover:shadow-md hover:-translate-y-0.5 disabled:transform-none disabled:shadow-none'
            >
              {isPending ? 'Creating Campaign...' : 'Create Campaign'}
            </button>
            <button
              type='button'
              onClick={() => {
                reset();
                setSelectedProvince('');
                setDistricts([]);
                setSectors([]);
              }}
              disabled={isPending}
              className='rounded-lg border border-slate-300 px-6 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50 hover:border-slate-400 transition-all shadow-sm hover:shadow disabled:opacity-50 disabled:cursor-not-allowed'
            >
              Clear
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
