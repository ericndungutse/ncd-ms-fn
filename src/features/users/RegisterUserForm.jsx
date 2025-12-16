import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import { useRegisterUser } from './users.queries';
import { getErrorMessage } from '../../utils/axios.utils';
import { RWANDA_LOCATIONS } from '../../utils/locations';
import FormInput from '../../ui/FormInput';

export default function RegisterUserForm({ mode = 'page', onSuccess, onCancel }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setError,
  } = useForm({
    defaultValues: {
      email: '',
      firstName: '',
      lastName: '',
      phoneNumber: '',
      nationalIdNumber: '',
      birthDay: '',
      birthMonth: '',
      birthYear: '',
      province: '',
      district: '',
      sector: '',
      cell: '',
      village: '',
    },
  });

  const { isPending, registerUserMutation, error } = useRegisterUser();
  const [selectedProvince, setSelectedProvince] = useState('');
  const [districts, setDistricts] = useState([]);
  const [sectors, setSectors] = useState([]);

  const isModal = mode === 'modal';

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
    // Construct date of birth from separate fields
    let dateOfBirth = '';
    if (data.birthYear && data.birthMonth && data.birthDay) {
      const month = String(data.birthMonth).padStart(2, '0');
      const day = String(data.birthDay).padStart(2, '0');
      dateOfBirth = `${data.birthYear}-${month}-${day}`;
    }

    // Transform data to match API payload structure
    const payload = {
      email: data.email,
      profile: {
        firstName: data.firstName,
        lastName: data.lastName,
        phoneNumber: data.phoneNumber,
        nationalIdNumber: data.nationalIdNumber,
        dateOfBirth: dateOfBirth,
        address: {
          province: data.province,
          district: data.district,
          sector: data.sector,
          cell: data.cell,
          village: data.village,
        },
      },
    };

    registerUserMutation(payload, {
      onSuccess: () => {
        reset();
        setSelectedProvince('');
        setDistricts([]);
        setSectors([]);
        if (onSuccess) onSuccess();
      },
      onError: (error) => {
        const errorData = error?.response?.data;

        if (errorData?.errors) {
          // Map API field errors to form fields
          Object.entries(errorData.errors).forEach(([field, message]) => {
            // Handle nested profile and address fields
            let fieldName = field;
            if (field.startsWith('profile.address.')) {
              fieldName = field.replace('profile.address.', '');
            } else if (field.startsWith('profile.')) {
              fieldName = field.replace('profile.', '');
            }

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
    <div className='max-w-4xl mx-auto space-y-4 sm:space-y-6 animate-fade-in'>
      {/* Breadcrumb Navigation */}
      {!isModal && (
        <div className='flex items-center gap-3'>
          <Link
            to='/users'
            className='inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 sm:px-4 py-2 sm:py-2.5 text-xs sm:text-sm font-semibold text-slate-700 hover:bg-slate-50 hover:border-slate-300 transition-all shadow-sm hover:shadow cursor-pointer'
          >
            <FiArrowLeft className='h-3 w-3 sm:h-4 sm:w-4' /> Back to Users
          </Link>
        </div>
      )}

      {/* Form Container */}
      <div className='rounded-lg border border-slate-200 bg-white p-4 sm:p-5 md:p-6 shadow-sm'>
        <div className='mb-4 sm:mb-6'>
          <h2 className='text-lg sm:text-xl font-semibold text-slate-900'>New User Account</h2>
        </div>

        {error && !error?.response?.data?.errors && (
          <div className='mb-4 sm:mb-6 rounded-lg border border-rose-200 bg-rose-50 p-3 sm:p-4 text-xs sm:text-sm text-rose-700 font-medium'>
            {getErrorMessage(error)}
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className='space-y-4 sm:space-y-5'>
          {/* Email */}
          <FormInput
            label='Email'
            id='email'
            type='email'
            placeholder='user@example.com'
            register={register}
            registerOptions={{
              required: 'Email is required',
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: 'Invalid email address',
              },
            }}
            error={errors.email}
          />

          {/* Personal Information Section */}
          <div className='space-y-3 sm:space-y-4 rounded-lg bg-slate-50 border border-slate-200 p-4 sm:p-5'>
            <h3 className='text-xs font-semibold text-slate-700 uppercase tracking-wide'>Personal Info</h3>

            <div className='grid gap-3 sm:gap-4 sm:grid-cols-2'>
              <FormInput
                label='First Name'
                id='firstName'
                type='text'
                placeholder='John'
                register={register}
                registerOptions={{
                  required: 'First name is required',
                  minLength: {
                    value: 2,
                    message: 'First name must be at least 2 characters',
                  },
                }}
                error={errors.firstName}
              />

              <FormInput
                label='Last Name'
                id='lastName'
                type='text'
                placeholder='Doe'
                register={register}
                registerOptions={{
                  required: 'Last name is required',
                  minLength: {
                    value: 2,
                    message: 'Last name must be at least 2 characters',
                  },
                }}
                error={errors.lastName}
              />
            </div>

            <div className='grid gap-3 sm:gap-4 sm:grid-cols-2'>
              <FormInput
                label='Phone Number'
                id='phoneNumber'
                type='tel'
                placeholder='0788001122'
                register={register}
                registerOptions={{
                  required: 'Phone number is required',
                  pattern: {
                    value: /^07[2-9][0-9]{7}$/,
                    message: 'Invalid Rwanda phone number',
                  },
                }}
                error={errors.phoneNumber}
              />

              <FormInput
                label='National ID Number'
                id='nationalIdNumber'
                type='text'
                placeholder='1199880012345678'
                register={register}
                registerOptions={{
                  required: 'National ID number is required',
                  pattern: {
                    value: /^[0-9]{16}$/,
                    message: 'National ID must be 16 digits',
                  },
                }}
                error={errors.nationalIdNumber}
              />
            </div>

            {/* Date of Birth */}
            <div>
              <label className='block text-xs sm:text-sm font-semibold text-slate-900 mb-2'>Birth date</label>
              <div className='grid grid-cols-3 gap-2'>
                {/* Day */}
                <div>
                  <select
                    {...register('birthDay')}
                    className='w-full px-3 sm:px-4 py-2 sm:py-2.5 border rounded-lg text-slate-900 text-xs sm:text-sm font-medium focus:outline-none transition-all shadow-sm border-slate-200 bg-white hover:border-slate-300 focus:border-sky-600 focus:ring-2 focus:ring-sky-100 cursor-pointer'
                  >
                    <option value=''>Day</option>
                    {Array.from({ length: 31 }, (_, i) => i + 1).map((day) => (
                      <option key={day} value={day}>
                        {day}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Month */}
                <div>
                  <select
                    {...register('birthMonth')}
                    className='w-full px-3 sm:px-4 py-2 sm:py-2.5 border rounded-lg text-slate-900 text-xs sm:text-sm font-medium focus:outline-none transition-all shadow-sm border-slate-200 bg-white hover:border-slate-300 focus:border-sky-600 focus:ring-2 focus:ring-sky-100 cursor-pointer'
                  >
                    <option value=''>Month</option>
                    <option value='1'>January</option>
                    <option value='2'>February</option>
                    <option value='3'>March</option>
                    <option value='4'>April</option>
                    <option value='5'>May</option>
                    <option value='6'>June</option>
                    <option value='7'>July</option>
                    <option value='8'>August</option>
                    <option value='9'>September</option>
                    <option value='10'>October</option>
                    <option value='11'>November</option>
                    <option value='12'>December</option>
                  </select>
                </div>

                {/* Year */}
                <div>
                  <select
                    {...register('birthYear')}
                    className='w-full px-3 sm:px-4 py-2 sm:py-2.5 border rounded-lg text-slate-900 text-xs sm:text-sm font-medium focus:outline-none transition-all shadow-sm border-slate-200 bg-white hover:border-slate-300 focus:border-sky-600 focus:ring-2 focus:ring-sky-100 cursor-pointer'
                  >
                    <option value=''>Year</option>
                    {Array.from({ length: 100 }, (_, i) => new Date().getFullYear() - i).map((year) => (
                      <option key={year} value={year}>
                        {year}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Address Section */}
          <div className='space-y-3 sm:space-y-4 rounded-lg bg-slate-50 border border-slate-200 p-4 sm:p-5'>
            <h3 className='text-xs font-semibold text-slate-700 uppercase tracking-wide'>Address & Location</h3>

            <div className='grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4'>
              {/* Province */}
              <div>
                <label htmlFor='province' className='block text-xs sm:text-sm font-semibold text-slate-900 mb-2'>
                  Province
                  <span className='text-rose-600 ml-1'>*</span>
                </label>
                <select
                  {...register('province', {
                    required: 'Province is required',
                    onChange: handleProvinceChange,
                  })}
                  id='province'
                  className={`w-full px-3 sm:px-4 py-2 sm:py-2.5 border rounded-lg text-slate-900 text-xs sm:text-sm font-medium focus:outline-none transition-all shadow-sm cursor-pointer ${
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
                {errors.province && <p className='text-rose-600 text-xs font-medium mt-1'>{errors.province.message}</p>}
              </div>

              {/* District */}
              {districts.length > 0 && (
                <div>
                  <label htmlFor='district' className='block text-xs sm:text-sm font-semibold text-slate-900 mb-2'>
                    District
                    <span className='text-rose-600 ml-1'>*</span>
                  </label>
                  <select
                    {...register('district', {
                      required: 'District is required',
                      onChange: handleDistrictChange,
                    })}
                    id='district'
                    className={`w-full px-3 sm:px-4 py-2 sm:py-2.5 border rounded-lg text-slate-900 text-xs sm:text-sm font-medium focus:outline-none transition-all shadow-sm cursor-pointer ${
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
                    <p className='text-rose-600 text-xs font-medium mt-1'>{errors.district.message}</p>
                  )}
                </div>
              )}

              {/* Sector */}
              {sectors.length > 0 && (
                <div>
                  <label htmlFor='sector' className='block text-xs sm:text-sm font-semibold text-slate-900 mb-2'>
                    Sector
                    <span className='text-rose-600 ml-1'>*</span>
                  </label>
                  <select
                    {...register('sector', {
                      required: 'Sector is required',
                    })}
                    id='sector'
                    className={`w-full px-3 sm:px-4 py-2 sm:py-2.5 border rounded-lg text-slate-900 text-xs sm:text-sm font-medium focus:outline-none transition-all shadow-sm cursor-pointer ${
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
                  {errors.sector && <p className='text-rose-600 text-xs font-medium mt-1'>{errors.sector.message}</p>}
                </div>
              )}
            </div>

            {/* Cell & Village */}
            <div className='grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4'>
              {/* Cell */}
              <FormInput
                label='Cell'
                id='cell'
                type='text'
                placeholder='e.g., Bibare'
                register={register}
                registerOptions={{
                  required: 'Cell is required',
                }}
                error={errors.cell}
              />

              {/* Village */}
              <FormInput
                label='Village'
                id='village'
                type='text'
                placeholder='e.g., Gashuru'
                register={register}
                registerOptions={{
                  required: 'Village is required',
                }}
                error={errors.village}
              />
            </div>
          </div>

          {/* Submit Buttons */}
          <div className='flex flex-col sm:flex-row gap-2 sm:gap-3 pt-1'>
            <button
              type='submit'
              disabled={isPending}
              className='flex-1 rounded-lg bg-sky-700 px-4 sm:px-6 py-2.5 sm:py-3 text-xs sm:text-sm font-semibold text-white hover:bg-sky-800 disabled:bg-slate-300 disabled:cursor-not-allowed transition-all cursor-pointer'
            >
              {isPending ? 'Registering...' : 'Register'}
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
