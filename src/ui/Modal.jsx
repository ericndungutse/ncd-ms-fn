import { FiX } from 'react-icons/fi';

export default function Modal({ isOpen, onClose, title, children, maxWidth = 'max-w-4xl' }) {
  if (!isOpen) return null;

  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center px-4 py-8 bg-slate-900/40 backdrop-blur-sm'>
      <div className={`relative w-full ${maxWidth} bg-white border border-slate-200 rounded-2xl shadow-2xl`}>
        <div className='flex items-center justify-between px-6 py-4 border-b border-slate-200'>
          <div>{title ? <h3 className='text-lg font-semibold text-slate-900'>{title}</h3> : null}</div>
          <button
            type='button'
            onClick={onClose}
            className='inline-flex h-10 w-10 items-center justify-center rounded-full border border-transparent text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition-colors'
            aria-label='Close modal'
          >
            <FiX className='h-5 w-5' />
          </button>
        </div>

        <div className='p-6 max-h-[80vh] overflow-y-auto'>{children}</div>
      </div>
    </div>
  );
}
