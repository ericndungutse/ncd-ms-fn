export default function FeatureItem({ icon, title, description }) {
  const IconComponent = icon;
  return (
    <div className='flex items-start gap-3'>
      <span className='text-3xl text-teal-400 shrink-0 items-center mr-2.5'>
        <IconComponent />
      </span>

      <div>
        <p className='font-semibold'>{title}</p>
        <p className='text-sm text-slate-400'>{description}</p>
      </div>
    </div>
  );
}
