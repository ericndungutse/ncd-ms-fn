export default function FeatureItem({ icon, title, description }) {
  const IconComponent = icon;
  return (
    <div className='flex items-start gap-3'>
      <span className='text-3xl text-sky-500 shrink-0 items-center mr-2.5'>
        <IconComponent />
      </span>

      <div>
        <p className='font-semibold text-slate-900'>{title}</p>
        <p className='text-sm text-slate-600 leading-relaxed'>{description}</p>
      </div>
    </div>
  );
}
