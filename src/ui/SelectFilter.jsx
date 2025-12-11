export default function SelectFilter({ value, onChange, options = [], placeholder = 'All' }) {
  return (
    <select
      value={value}
      onChange={(e) => onChange?.(e.target.value)}
      className='w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-100 shadow-soft'
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
