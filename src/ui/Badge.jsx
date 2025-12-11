export default function Badge({ children }) {
  return (
    <span className='inline-flex items-center rounded border border-sky-200 bg-sky-50 px-2 py-1 text-xs font-medium text-sky-700'>
      {children}
    </span>
  );
}
