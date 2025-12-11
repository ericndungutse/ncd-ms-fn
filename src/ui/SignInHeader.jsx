import PageLogo from './PageLogo';

export default function SignInHeader() {
  return (
    <div>
      <PageLogo variant='mobile' />
      <h1 className='md:hidden text-2xl font-bold text-slate-900 text-center mb-8'>NCDC System</h1>
      <div className='mb-8'>
        <h2 className='text-3xl font-bold text-slate-900 mb-2'>Welcome back</h2>
        <p className='text-slate-600'>Sign in to your account to continue</p>
      </div>
    </div>
  );
}
