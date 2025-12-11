export default function CampaignCardSkeleton() {
  return (
    <div className='rounded-lg border border-slate-200 bg-white p-6 animate-pulse'>
      <div className='mb-4 flex items-start justify-between gap-3'>
        <div className='flex-1 space-y-2'>
          <div className='h-6 bg-slate-200 rounded w-3/4'></div>
          <div className='h-4 bg-slate-200 rounded w-full'></div>
        </div>
        <div className='h-6 w-20 bg-slate-200 rounded-full'></div>
      </div>

      <div className='mb-4 space-y-2'>
        <div className='flex items-center gap-2'>
          <div className='h-4 w-4 bg-slate-200 rounded'></div>
          <div className='h-4 bg-slate-200 rounded w-48'></div>
        </div>
        <div className='flex items-center gap-2'>
          <div className='h-4 w-4 bg-slate-200 rounded'></div>
          <div className='h-4 bg-slate-200 rounded w-32'></div>
        </div>
        <div className='flex items-center gap-2'>
          <div className='h-4 w-4 bg-slate-200 rounded'></div>
          <div className='h-4 bg-slate-200 rounded w-40'></div>
        </div>
        <div className='pl-6'>
          <div className='h-3 bg-slate-200 rounded w-56'></div>
        </div>
      </div>

      <div className='mb-4 space-y-2'>
        <div className='flex items-center justify-between'>
          <div className='h-4 bg-slate-200 rounded w-20'></div>
        </div>
        <div className='h-2 bg-slate-200 rounded w-full'></div>
      </div>

      <div className='h-10 bg-slate-200 rounded-lg w-full'></div>
    </div>
  );
}
