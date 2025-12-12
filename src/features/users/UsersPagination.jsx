import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

export default function UsersPagination({ pagination, currentPage, onPageChange, pageSize, onPageSizeChange }) {
  const { totalPages, totalElements, elementsPerPage } = pagination;

  const startElement = (currentPage - 1) * elementsPerPage + 1;
  const endElement = Math.min(currentPage * elementsPerPage, totalElements);

  const handlePrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  const pageSizeOptions = [5, 10, 20, 50];

  return (
    <div className='flex flex-col sm:flex-row items-center justify-between gap-4 rounded-lg border border-slate-200 bg-white px-4 py-3 shadow-sm'>
      {/* Results info */}
      <div className='text-sm text-slate-600'>
        Showing <span className='font-semibold text-slate-900'>{startElement}</span> to{' '}
        <span className='font-semibold text-slate-900'>{endElement}</span> of{' '}
        <span className='font-semibold text-slate-900'>{totalElements}</span> results
      </div>

      <div className='flex items-center gap-4'>
        {/* Page size selector */}
        <div className='flex items-center gap-2'>
          <label htmlFor='pageSize' className='text-sm text-slate-600'>
            Per page:
          </label>
          <select
            id='pageSize'
            value={pageSize}
            onChange={(e) => onPageSizeChange(Number(e.target.value))}
            className='rounded border border-slate-300 px-2 py-1 text-sm font-medium text-slate-700 hover:border-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500'
          >
            {pageSizeOptions.map((size) => (
              <option key={size} value={size}>
                {size}
              </option>
            ))}
          </select>
        </div>

        {/* Pagination controls */}
        <div className='flex items-center gap-2'>
          <button
            onClick={handlePrevious}
            disabled={currentPage === 1}
            className='inline-flex items-center gap-1 rounded border border-slate-300 bg-white px-3 py-1.5 text-sm font-medium text-slate-700 hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors'
          >
            <FiChevronLeft className='h-4 w-4' />
            Previous
          </button>

          <div className='flex items-center gap-1'>
            <span className='text-sm text-slate-600'>
              Page <span className='font-semibold text-slate-900'>{currentPage}</span> of{' '}
              <span className='font-semibold text-slate-900'>{totalPages}</span>
            </span>
          </div>

          <button
            onClick={handleNext}
            disabled={currentPage === totalPages}
            className='inline-flex items-center gap-1 rounded border border-slate-300 bg-white px-3 py-1.5 text-sm font-medium text-slate-700 hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors'
          >
            Next
            <FiChevronRight className='h-4 w-4' />
          </button>
        </div>
      </div>
    </div>
  );
}
