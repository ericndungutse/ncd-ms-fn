import { FiSearch } from 'react-icons/fi';

export default function SearchInput({ value, onChange, placeholder, icon: Icon = FiSearch, inputProps = {} }) {
  return (
    <div className='relative'>
      {Icon && <Icon className='absolute left-3 top-3.5 h-5 w-5 text-slate-400' />}
      <input
        type='text'
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        placeholder={placeholder}
        className='w-full rounded-xl border border-slate-200 bg-white pl-11 pr-4 py-3 text-sm focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-100 shadow-soft'
        {...inputProps}
      />
    </div>
  );
}
