export default function FormButton({ children, type = 'submit', isLoading = false, disabled = false }) {
  return (
    <button
      type={type}
      disabled={disabled || isLoading}
      className='w-full bg-linear-to-r from-teal-600 to-teal-700 hover:from-teal-700 hover:to-teal-800 disabled:from-slate-400 disabled:to-slate-500 text-white font-semibold py-3 px-4 rounded-lg transition duration-300 mt-8 active:scale-95 shadow-lg hover:shadow-xl disabled:shadow-md'
    >
      {isLoading ? 'Loading...' : children}
    </button>
  );
}
