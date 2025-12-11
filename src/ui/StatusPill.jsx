const toneClasses = {
  teal: 'bg-teal-100 text-teal-700 ring-1 ring-teal-200',
  amber: 'bg-amber-100 text-amber-700 ring-1 ring-amber-200',
  rose: 'bg-rose-100 text-rose-700 ring-1 ring-rose-200',
  slate: 'bg-slate-100 text-slate-700 ring-1 ring-slate-200',
};

export default function StatusPill({ label, tone = 'slate' }) {
  const classes = toneClasses[tone] || toneClasses.slate;

  return (
    <span className={`inline-flex whitespace-nowrap rounded-full px-3 py-1.5 text-xs font-bold ${classes} shadow-sm`}>
      {label}
    </span>
  );
}
