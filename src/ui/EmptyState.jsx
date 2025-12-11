export default function EmptyState({ title, message }) {
  return (
    <div className='col-span-full rounded-xl border-2 border-dashed border-slate-300 bg-slate-50/50 p-12 text-center animate-fade-in'>
      <div className='mx-auto max-w-md'>
        <div className='mx-auto mb-4 h-16 w-16 rounded-full bg-slate-100 flex items-center justify-center'>
          <svg className='h-8 w-8 text-slate-400' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={2}
              d='M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4'
            />
          </svg>
        </div>
        <p className='text-lg font-semibold text-slate-900 mb-2'>{title}</p>
        {message && <p className='text-sm text-slate-600 leading-relaxed'>{message}</p>}
      </div>
    </div>
  );
}
