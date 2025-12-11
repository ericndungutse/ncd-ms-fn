import SearchInput from '../../ui/SearchInput';
import SelectFilter from '../../ui/SelectFilter';

export default function CampaignFilters({ searchTerm, onSearchChange, filterStatus, onStatusChange, statuses }) {
  const statusOptions = statuses.map((status) => ({ value: status, label: status }));

  return (
    <div className='grid gap-4 sm:grid-cols-2 lg:grid-cols-3'>
      <div className='lg:col-span-2'>
        <SearchInput
          value={searchTerm}
          onChange={onSearchChange}
          placeholder='Search campaign name, location, or district...'
        />
      </div>

      <SelectFilter value={filterStatus} onChange={onStatusChange} options={statusOptions} placeholder='All Status' />
    </div>
  );
}
