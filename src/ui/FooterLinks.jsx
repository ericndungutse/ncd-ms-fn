export default function FooterLinks() {
  return (
    <div className='mt-8 flex flex-col gap-4 text-sm'>
      <a href='#' className='text-center text-teal-600 hover:text-teal-700 font-medium transition'>
        Forgot your password?
      </a>
      <div className='text-center'>
        <span className='text-slate-600'>Need help? </span>
        <a href='#' className='text-teal-600 hover:text-teal-700 font-medium transition'>
          Contact support
        </a>
      </div>
    </div>
  );
}
