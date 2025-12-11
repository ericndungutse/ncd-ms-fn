import PageLogo from './PageLogo';

export default function SignInHeader() {
  return (
    <div>
      <div className='mb-10 text-center'>
        <h2 className='text-4xl font-bold text-slate-900 mb-3 tracking-tight'>Welcome back</h2>
        <p className='text-slate-600 text-lg leading-relaxed'>
          Sign in to continue coordinating screenings and follow-ups with a calmer, brighter workspace.
        </p>
      </div>
    </div>
  );
}
