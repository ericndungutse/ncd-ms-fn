export default function FormInput({ label, id, type = 'text', placeholder, register, registerOptions, error }) {
  const isError = !!error;

  return (
    <div>
      {label && (
        <label htmlFor={id} className='block text-sm font-semibold text-slate-900 mb-2'>
          {label}
        </label>
      )}
      <input
        {...register(id, registerOptions)}
        id={id}
        type={type}
        placeholder={placeholder}
        className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none transition ${
          isError
            ? 'border-red-500 bg-red-50 focus:ring-2 focus:ring-red-200'
            : 'border-slate-200 bg-white hover:border-slate-300 focus:border-teal-500 focus:ring-2 focus:ring-teal-100'
        }`}
      />
      {isError && <p className='text-red-600 text-xs mt-2 font-medium'>{error.message}</p>}
    </div>
  );
}
