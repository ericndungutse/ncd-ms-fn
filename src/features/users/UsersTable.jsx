import Badge from '../../ui/Badge';

export default function UsersTable({ users, isLoading }) {
  const getRoleBadgeVariant = (role) => {
    const roleMap = {
      admin: 'rose',
      'screening volunteer': 'sky',
      user: 'slate',
    };
    return roleMap[role] || 'slate';
  };

  return (
    <div className='overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm'>
      <div className='overflow-x-auto'>
        <table className='min-w-full divide-y divide-slate-200'>
          <thead className='bg-slate-50'>
            <tr>
              <th className='px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-600'>
                Email
              </th>
              <th className='px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-600'>
                First Name
              </th>
              <th className='px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-600'>
                Patient Number
              </th>
              <th className='px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-600'>
                Roles
              </th>
            </tr>
          </thead>
          <tbody className='divide-y divide-slate-200 bg-white'>
            {users.map((user) => (
              <tr key={user.id} className={`transition-colors hover:bg-slate-50 ${isLoading ? 'opacity-50' : ''}`}>
                <td className='whitespace-nowrap px-6 py-4'>
                  <div className='text-sm font-medium text-slate-900'>{user.email}</div>
                </td>
                <td className='whitespace-nowrap px-6 py-4'>
                  <div className='text-sm text-slate-700'>
                    {user.firstName || <span className='italic text-slate-400'>Not set</span>}
                  </div>
                </td>
                <td className='whitespace-nowrap px-6 py-4'>
                  <div className='text-sm text-slate-700'>
                    {user.patientNumber || <span className='italic text-slate-400'>N/A</span>}
                  </div>
                </td>
                <td className='whitespace-nowrap px-6 py-4'>
                  <div className='flex flex-wrap gap-1.5'>
                    {user.roles.map((role) => (
                      <Badge key={role} variant={getRoleBadgeVariant(role)}>
                        {role}
                      </Badge>
                    ))}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
