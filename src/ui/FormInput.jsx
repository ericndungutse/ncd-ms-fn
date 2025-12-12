export default function FormInput({
  label,
  id,
  name,
  type = 'text',
  placeholder,
  register,
  registerOptions,
  error,
  ...rest
}) {
  const isError = !!error;
  const fieldName = name || id;
  const registration = register && fieldName ? register(fieldName, registerOptions) : {};

  return (
    <div className='group'>
      {label && (
        <label
          htmlFor={id}
          className='block text-sm font-semibold text-slate-900 mb-2 transition-colors group-focus-within:text-teal-600'
        >
          {label}
        </label>
      )}
      <input
        {...registration}
        id={id || fieldName}
        name={fieldName}
        type={type}
        placeholder={placeholder}
        className={`w-full px-4 py-2.5 border rounded focus:outline-none transition-colors ${
          isError
            ? 'border-red-500 bg-red-50 focus:ring-2 focus:ring-red-100 focus:border-red-500'
            : 'border-slate-200 bg-white hover:border-slate-300 focus:border-sky-500 focus:ring-2 focus:ring-sky-100'
        }`}
        {...rest}
      />
      {isError && (
        <div className='flex items-center gap-2 mt-2 animate-fade-in'>
          <svg className='w-4 h-4 text-red-600' fill='currentColor' viewBox='0 0 20 20'>
            <path
              fillRule='evenodd'
              d='M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z'
              clipRule='evenodd'
            />
          </svg>
          <p className='text-red-600 text-xs font-medium'>{error.message}</p>
        </div>
      )}
    </div>
  );
}
