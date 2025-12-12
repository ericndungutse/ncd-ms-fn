import { useFetchIndicators } from './indicators.queries';
import IndicatorCard from './IndicatorCard';
import EmptyState from '../../ui/EmptyState';

export default function IndicatorsList() {
  const { data: indicators, isLoading, error } = useFetchIndicators();

  if (error) {
    return (
      <div className='rounded-lg border border-rose-200 bg-rose-50 p-4'>
        <p className='text-sm font-medium text-rose-700'>{error}</p>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className='grid gap-6 md:grid-cols-2 lg:grid-cols-3'>
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className='h-64 bg-slate-100 rounded-lg animate-pulse' />
        ))}
      </div>
    );
  }

  if (!indicators || indicators.length === 0) {
    return (
      <EmptyState title='No indicators found' message='There are no NCD indicators configured in the system yet.' />
    );
  }

  return (
    <div className='grid gap-6 md:grid-cols-2 lg:grid-cols-3'>
      {indicators.map((indicator) => (
        <IndicatorCard key={indicator._id} indicator={indicator} />
      ))}
    </div>
  );
}
