export const QuickActionButton = ({ title, description, icon: Icon, onClick, color = 'sky' }) => {
  const colorClasses = {
    sky: 'border-sky-200 hover:border-sky-300 hover:bg-sky-50',
    emerald: 'border-emerald-200 hover:border-emerald-300 hover:bg-emerald-50',
    blue: 'border-blue-200 hover:border-blue-300 hover:bg-blue-50',
  };

  const iconColorClasses = {
    sky: 'bg-sky-100 text-sky-600',
    emerald: 'bg-emerald-100 text-emerald-600',
    blue: 'bg-blue-100 text-blue-600',
  };

  return (
    <button
      onClick={onClick}
      className={`w-full text-left bg-white border rounded-xl p-4 transition-all ${colorClasses[color]}`}
    >
      <div className='flex items-start gap-3'>
        <div className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${iconColorClasses[color]}`}>
          <Icon className='w-5 h-5' />
        </div>
        <div>
          <div className='font-semibold text-slate-900 mb-0.5'>{title}</div>
          <div className='text-xs text-slate-600'>{description}</div>
        </div>
      </div>
    </button>
  );
};
