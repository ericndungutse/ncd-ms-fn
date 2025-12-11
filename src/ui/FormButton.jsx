export default function FormButton({ children, type = 'submit', isLoading = false, disabled = false }) {
  return (
    <button
      type={type}
      disabled={disabled || isLoading}
      className='w-full bg-sky-600 hover:bg-sky-700 disabled:bg-slate-300 text-white font-medium py-3 px-6 rounded border border-sky-600 hover:border-sky-700 disabled:border-slate-300 transition-colors mt-8'
    >
      <span className='flex items-center justify-center gap-2'>
        {isLoading && (
          <svg className='animate-spin h-5 w-5' xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24'>
            <circle className='opacity-25' cx='12' cy='12' r='10' stroke='currentColor' strokeWidth='4'></circle>
            <path
              className='opacity-75'
              fill='currentColor'
              d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
            ></path>
          </svg>
        )}
        {isLoading ? 'Loading...' : children}
      </span>
    </button>
  );
}
