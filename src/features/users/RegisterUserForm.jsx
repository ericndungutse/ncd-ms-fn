import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import { useRegisterUser } from './users.queries';
import { getErrorMessage } from '../../utils/axios.utils';
import { RWANDA_LOCATIONS } from '../../utils/locations';
import FormInput from '../../ui/FormInput';

export default function RegisterUserForm() {
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
    <div className='max-w-4xl mx-auto space-y-6 animate-fade-in'>
      {/* Breadcrumb Navigation */}
      <div className='flex items-center gap-3'>
        <Link
          to='/users'
          className='inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50 hover:border-slate-300 transition-all shadow-sm hover:shadow'
        >
          <FiArrowLeft className='h-4 w-4' /> Back to Users
        </Link>
      </div>

      {/* Form Container */}
      <div className='rounded-lg border border-slate-200 bg-white p-6 shadow-sm'>
        <div className='mb-6'>
          <h2 className='text-2xl font-semibold text-slate-900'>Register New User</h2>
          <p className='mt-1 text-sm text-slate-600'>Create a new user account with profile information</p>
        </div>

        {error && !error?.response?.data?.errors && (
          <div className='mb-6 rounded-lg border border-rose-200 bg-rose-50 p-4 text-sm text-rose-700 font-medium'>
            {getErrorMessage(error)}
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className='space-y-5'>
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
          <div className='space-y-4 rounded-lg bg-slate-50 border border-slate-200 p-5'>
            <h3 className='text-sm font-semibold text-slate-900'>Personal Information</h3>

            <div className='grid gap-4 sm:grid-cols-2'>
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

            <div className='grid gap-4 sm:grid-cols-2'>
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
              <label className='block text-sm font-semibold text-slate-900 mb-2'>Date of Birth</label>
              <div className='grid grid-cols-3 gap-3'>
                {/* Day */}
                <div>
                  <select
                    {...register('birthDay')}
                    className='w-full px-4 py-2.5 border rounded-lg text-slate-900 text-sm font-medium focus:outline-none transition-all shadow-sm border-slate-200 bg-white hover:border-slate-300 focus:border-sky-600 focus:ring-2 focus:ring-sky-100'
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
                    className='w-full px-4 py-2.5 border rounded-lg text-slate-900 text-sm font-medium focus:outline-none transition-all shadow-sm border-slate-200 bg-white hover:border-slate-300 focus:border-sky-600 focus:ring-2 focus:ring-sky-100'
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
                    className='w-full px-4 py-2.5 border rounded-lg text-slate-900 text-sm font-medium focus:outline-none transition-all shadow-sm border-slate-200 bg-white hover:border-slate-300 focus:border-sky-600 focus:ring-2 focus:ring-sky-100'
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
          <div className='space-y-4 rounded-lg bg-slate-50 border border-slate-200 p-5'>
            <h3 className='text-sm font-semibold text-slate-900'>Address</h3>

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

          {/* Submit Buttons */}
          <div className='flex gap-3 pt-2'>
            <button
              type='submit'
              disabled={isPending}
              className='flex-1 rounded-lg bg-sky-700 px-6 py-3 text-sm font-semibold text-white hover:bg-sky-800 disabled:bg-slate-300 disabled:cursor-not-allowed transition-all shadow-sm hover:shadow-md hover:-translate-y-0.5 disabled:transform-none disabled:shadow-none'
            >
              {isPending ? 'Registering User...' : 'Register User'}
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
