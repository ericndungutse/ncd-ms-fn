export default function ProgressBar({ value, tone = 'teal' }) {
  const tones = {
    teal: 'bg-teal-500',
    amber: 'bg-amber-500',
    rose: 'bg-rose-500',
  };

  return (
    <div className='h-2 rounded-full bg-slate-100'>
      <div className={`h-2 rounded-full ${tones[tone]}`} style={{ width: `${value}%` }} />
    </div>
  );
}
