export default function Badge({ children, variant = 'sky' }) {
  const variantStyles = {
    sky: 'border-sky-200 bg-sky-50 text-sky-700',
    rose: 'border-rose-200 bg-rose-50 text-rose-700',
    slate: 'border-slate-200 bg-slate-50 text-slate-700',
    green: 'border-green-200 bg-green-50 text-green-700',
    amber: 'border-amber-200 bg-amber-50 text-amber-700',
  };

  return (
    <span
      className={`inline-flex items-center rounded border px-2 py-1 text-xs font-medium ${
        variantStyles[variant] || variantStyles.sky
      }`}
    >
      {children}
    </span>
  );
}
