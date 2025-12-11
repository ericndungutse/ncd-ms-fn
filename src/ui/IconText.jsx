export default function IconText({ icon: Icon, children, className = '' }) {
  if (!Icon) return <span>{children}</span>;

  return (
    <div className={`flex items-center gap-2 text-slate-600 ${className}`}>
      <Icon className='h-4 w-4' />
      <span>{children}</span>
    </div>
  );
}
