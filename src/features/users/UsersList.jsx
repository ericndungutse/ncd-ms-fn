import { useState } from 'react';
import { useFetchUsers } from './users.queries';
import UsersTable from './UsersTable';
import UsersPagination from './UsersPagination';
import EmptyState from '../../ui/EmptyState';

export default function UsersList() {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(20);

  const { data, isLoading, error, isFetching } = useFetchUsers({
    page: currentPage,
    limit: pageSize,
  });

  const { users, pagination } = data;

  if (error) {
    return (
      <div className='rounded-lg border border-rose-200 bg-rose-50 p-4'>
        <p className='text-sm font-medium text-rose-700'>{error}</p>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className='space-y-4'>
        <div className='h-12 bg-slate-100 rounded animate-pulse' />
        <div className='h-64 bg-slate-100 rounded animate-pulse' />
      </div>
    );
  }

  if (!users || users.length === 0) {
    return <EmptyState title='No users found' message='There are no users in the system yet.' />;
  }

  return (
    <div className='space-y-6'>
      <UsersTable users={users} isLoading={isFetching} />

      {pagination && (
        <UsersPagination
          pagination={pagination}
          currentPage={currentPage}
          onPageChange={setCurrentPage}
          pageSize={pageSize}
          onPageSizeChange={(newSize) => {
            setPageSize(newSize);
            setCurrentPage(1);
          }}
        />
      )}
    </div>
  );
}
