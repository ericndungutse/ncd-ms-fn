export default function ProgressBar({ value, tone = 'teal' }) {
  const tones = {
    teal: 'bg-linear-to-r from-sky-400 to-emerald-500',
    amber: 'bg-linear-to-r from-amber-400 to-orange-500',
    rose: 'bg-linear-to-r from-rose-400 to-pink-500',
  };

  return (
    <div className='h-2 rounded-full bg-slate-100 overflow-hidden'>
      <div className={`h-full rounded-full ${tones[tone]}`} style={{ width: `${value}%` }} />
    </div>
  );
}
