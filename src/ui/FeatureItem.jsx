export default function FeatureItem({ icon = '✓', title, description }) {
  return (
    <div className='flex items-start gap-3'>
      <span className='text-2xl text-teal-400 shrink-0'>{icon}</span>
      <div>
        <p className='font-semibold'>{title}</p>
        <p className='text-sm text-slate-400'>{description}</p>
      </div>
    </div>
  );
}
