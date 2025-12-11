export default function Table({ columns, rows }) {
  return (
    <div className='overflow-hidden rounded-lg border border-slate-200 bg-white'>
      <div className='overflow-x-auto'>
        <table className='min-w-full divide-y divide-slate-200 text-sm'>
          <thead className='bg-slate-50 text-left text-xs font-semibold uppercase tracking-wide text-slate-600'>
            <tr>
              {columns.map((col) => (
                <th key={col.key} className='px-4 py-3'>
                  {col.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className='divide-y divide-slate-100 bg-white text-slate-700'>
            {rows.map((row, idx) => (
              <tr key={idx} className='hover:bg-slate-50'>
                {columns.map((col) => (
                  <td key={col.key} className='px-4 py-3'>
                    {row[col.key]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
