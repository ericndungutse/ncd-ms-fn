export default function LoginFormContainer({ children }) {
  return (
    <div className='w-full md:w-1/2 flex flex-col justify-center items-center px-6 py-12 md:py-0 relative z-10'>
      <div className='w-full max-w-md surface-card p-8 md:p-10 border border-slate-200'>
        {children}
      </div>
    </div>
  );
}
