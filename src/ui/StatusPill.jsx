const toneClasses = {
  teal: 'bg-teal-100 text-teal-700',
  amber: 'bg-amber-100 text-amber-700',
  rose: 'bg-rose-100 text-rose-700',
  slate: 'bg-slate-100 text-slate-700',
};

export default function StatusPill({ label, tone = 'slate' }) {
  const classes = toneClasses[tone] || toneClasses.slate;

  return (
    <span className={`inline-flex whitespace-nowrap rounded-full px-2 py-1 text-xs font-semibold ${classes}`}>
      {label}
    </span>
  );
}
