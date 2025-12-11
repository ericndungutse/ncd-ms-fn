export default function EmptyState({ title, message }) {
  return (
    <div className='col-span-full rounded-lg border border-slate-200 bg-slate-50 p-8 text-center'>
      <p className='text-sm font-semibold text-slate-900'>{title}</p>
      {message && <p className='mt-2 text-sm text-slate-500'>{message}</p>}
    </div>
  );
}
