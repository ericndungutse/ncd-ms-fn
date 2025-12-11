import { useForm } from 'react-hook-form';
import LoginForm from '../components/LoginForm';

export default function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: '',
      password: '',
      rememberMe: false,
    },
  });

  return (
    /* Converted to split-screen layout with gradient background */
    <div className='min-h-screen bg-linear-to-br from-slate-900 to-slate-800 flex'>
      {/* Left Section - Branding */}
      <div className='hidden md:flex md:w-1/2 flex-col justify-center items-center px-12 text-white'>
        <div className='max-w-sm text-center'>
          <div className='mb-8 flex justify-center'>
            <img
              src='/images/whatsapp-20image-202025-12-09-20at-2010.jpg'
              alt='MediGo Care Logo'
              className='h-24 object-contain drop-shadow-lg'
            />
          </div>
          <h1 className='text-4xl font-bold mb-4 text-balance'>NCDCs Management System</h1>
          <p className='text-lg text-slate-300 mb-8'>
            Centralize disease surveillance data, track critical cases in real-time, and empower public health
            decision-making with actionable insights.
          </p>
          <div className='space-y-4 text-left'>
            <div className='flex items-start gap-3'>
              <span className='text-2xl text-teal-400 shrink-0'>✓</span>
              <div>
                <p className='font-semibold'>Centralized Data Management</p>
                <p className='text-sm text-slate-400'>
                  Consolidate screening and surveillance data in one secure platform
                </p>
              </div>
            </div>
            <div className='flex items-start gap-3'>
              <span className='text-2xl text-teal-400 shrink-0'>✓</span>
              <div>
                <p className='font-semibold'>Critical Case Tracking</p>
                <p className='text-sm text-slate-400'>
                  Monitor patients showing critical conditions and follow-up on hospital admissions
                </p>
              </div>
            </div>
            <div className='flex items-start gap-3'>
              <span className='text-2xl text-teal-400 shrink-0'>✓</span>
              <div>
                <p className='font-semibold'>Statistical Intelligence</p>
                <p className='text-sm text-slate-400'>Generate insights for informed public health decision-making</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Section - Login Form */}
      <div className='w-full md:w-1/2 bg-white flex flex-col justify-center items-center px-6 py-12 md:py-0'>
        <div className='w-full max-w-md'>
          {/* Mobile Logo */}
          <div className='md:hidden text-center mb-8'>
            <div className='mb-4 flex justify-center'>
              <img
                src='/images/whatsapp-20image-202025-12-09-20at-2010.jpg'
                alt='MediGo Care Logo'
                className='h-16 object-contain'
              />
            </div>
            <h1 className='text-2xl font-bold text-slate-900'>NCDC System</h1>
          </div>

          {/* Sign In Heading */}
          <div className='mb-8'>
            <h2 className='text-3xl font-bold text-slate-900 mb-2'>Welcome back</h2>
            <p className='text-slate-600'>Sign in to your account to continue</p>
          </div>

          {/* Form */}
          <LoginForm register={register} handleSubmit={handleSubmit} errors={errors} />

          {/* Footer Links */}
          <div className='mt-8 flex flex-col gap-4 text-sm'>
            <a href='#' className='text-center text-teal-600 hover:text-teal-700 font-medium transition'>
              Forgot your password?
            </a>
            <div className='text-center'>
              <span className='text-slate-600'>Need help? </span>
              <a href='#' className='text-teal-600 hover:text-teal-700 font-medium transition'>
                Contact support
              </a>
            </div>
          </div>

          {/* Copyright */}
          <p className='text-center text-slate-500 text-xs mt-8'>
            Powered by <span className='font-semibold text-slate-700'>MediGo Care</span>
          </p>
        </div>
      </div>
    </div>
  );
}
