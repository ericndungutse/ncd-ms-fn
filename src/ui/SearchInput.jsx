import { FiSearch } from 'react-icons/fi';

export default function SearchInput({ value, onChange, placeholder, icon: Icon = FiSearch, inputProps = {} }) {
  return (
    <div className='relative'>
      {Icon && <Icon className='absolute left-3 top-3 h-5 w-5 text-slate-400' />}
      <input
        type='text'
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        placeholder={placeholder}
        className='w-full rounded-lg border border-slate-200 bg-white pl-10 pr-3 py-2 text-sm focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500'
        {...inputProps}
      />
    </div>
  );
}
