export default function SelectFilter({ value, onChange, options = [], placeholder = 'All' }) {
  return (
    <select
      value={value}
      onChange={(e) => onChange?.(e.target.value)}
      className='w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500'
    >
      <option value=''>{placeholder}</option>
      {options.map((option) => (
        <option key={option.value ?? option.label} value={option.value ?? option.label}>
          {option.label ?? option.value}
        </option>
      ))}
    </select>
  );
}
