export default function LoginFormContainer({ children }) {
  return (
    <div className='w-full md:w-1/2 bg-white flex flex-col justify-center items-center px-6 py-12 md:py-0'>
      <div className='w-full max-w-md'>{children}</div>
    </div>
  );
}
