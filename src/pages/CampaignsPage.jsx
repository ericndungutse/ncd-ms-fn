import { useState } from 'react';
import ProgressBar from '../ui/ProgressBar';
import { FiMapPin, FiCalendar, FiClock, FiSearch } from 'react-icons/fi';

// Dummy campaigns data
const DUMMY_CAMPAIGNS = [
  {
    id: '1',
    title: 'NCDC Screening Campaign Nyarugenge District',
    description: 'A district-wide outreach program for NCD screening.',
    startDate: '2025-02-08',
    endDate: '2025-02-13',
    startTime: '08:00',
    endTime: '17:00',
    location: 'Kigali University Teaching Hospital (CHUK)',
    status: 'Planned',
    progress: 0,
    address: {
      province: 'Kigali City',
      district: 'Nyarugenge',
      sector: 'Muhima',
      cell: 'Kiyovu',
      village: 'Kiyovu Village',
    },
    assessmentsRecorded: 0,
    targetAssessments: 100,
  },
  {
    id: '2',
    title: 'Gasabo Outreach Program',
    description: 'Mobile screening unit visiting health centers in Gasabo.',
    startDate: '2025-01-15',
    endDate: '2025-01-21',
    startTime: '09:00',
    endTime: '16:00',
    location: 'Remera PHC',
    status: 'Active',
    progress: 68,
    address: {
      province: 'Kigali City',
      district: 'Gasabo',
      sector: 'Remera',
      cell: 'Rusororo',
      village: 'Remera',
    },
    assessmentsRecorded: 68,
    targetAssessments: 100,
  },
  {
    id: '3',
    title: 'Bugesera Mobile Campaign',
    description: 'Community-based screening initiative in Bugesera district.',
    startDate: '2024-12-10',
    endDate: '2024-12-14',
    startTime: '08:00',
    endTime: '17:00',
    location: 'Nyamata grounds',
    status: 'Completed',
    progress: 100,
    address: {
      province: 'Eastern Province',
      district: 'Bugesera',
      sector: 'Nyamata',
      cell: 'Central',
      village: 'Nyamata',
    },
    assessmentsRecorded: 125,
    targetAssessments: 125,
  },
  {
    id: '4',
    title: 'Kicukiro Health Center Campaign',
    description: 'Screening campaign at Kicukiro health center.',
    startDate: '2025-01-25',
    endDate: '2025-02-05',
    startTime: '07:00',
    endTime: '18:00',
    location: 'Kicukiro Health Center',
    status: 'Active',
    progress: 45,
    address: {
      province: 'Kigali City',
      district: 'Kicukiro',
      sector: 'Kicukiro',
      cell: 'Gatenga',
      village: 'Gatenga',
    },
    assessmentsRecorded: 45,
    targetAssessments: 100,
  },
  {
    id: '5',
    title: 'Musanze District NCD Initiative',
    description: 'Large-scale screening initiative in northern region.',
    startDate: '2025-03-01',
    endDate: '2025-03-14',
    startTime: '08:00',
    endTime: '17:00',
    location: 'Musanze Central Hospital',
    status: 'Planned',
    progress: 0,
    address: {
      province: 'Northern Province',
      district: 'Musanze',
      sector: 'Musanze',
      cell: 'Central',
      village: 'Ruhengeri',
    },
    assessmentsRecorded: 0,
    targetAssessments: 150,
  },
];

export default function CampaignsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('');

  const filteredCampaigns = DUMMY_CAMPAIGNS.filter((campaign) => {
    const matchesSearch =
      campaign.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      campaign.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      campaign.address.district.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = !filterStatus || campaign.status === filterStatus;

    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'Completed':
        return 'bg-teal-100 text-teal-700';
      case 'Active':
        return 'bg-amber-100 text-amber-700';
      case 'Planned':
        return 'bg-slate-100 text-slate-700';
      default:
        return 'bg-slate-100 text-slate-700';
    }
  };

  const getProgressBarTone = (status) => {
    switch (status) {
      case 'Completed':
        return 'teal';
      case 'Active':
        return 'amber';
      default:
        return 'rose';
    }
  };

  const statuses = [...new Set(DUMMY_CAMPAIGNS.map((c) => c.status))];

  return (
    <div className='space-y-6'>
      {/* Header */}
      <div>
        <h1 className='text-3xl font-bold text-slate-900'>Screening Campaigns</h1>
        <p className='mt-1 text-slate-500'>Manage and monitor NCD screening campaigns</p>
      </div>

      {/* Filters */}
      <div className='grid gap-4 sm:grid-cols-2 lg:grid-cols-3'>
        {/* Search */}
        <div className='lg:col-span-2'>
          <div className='relative'>
            <FiSearch className='absolute left-3 top-3 h-5 w-5 text-slate-400' />
            <input
              type='text'
              placeholder='Search campaign name, location, or district...'
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className='w-full rounded-lg border border-slate-200 bg-white pl-10 pr-3 py-2 text-sm focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500'
            />
          </div>
        </div>

        {/* Status Filter */}
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className='rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500'
        >
          <option value=''>All Status</option>
          {statuses.map((status) => (
            <option key={status} value={status}>
              {status}
            </option>
          ))}
        </select>
      </div>

      {/* Results Count */}
      <div className='flex items-center justify-between'>
        <p className='text-sm text-slate-500'>
          Showing <span className='font-semibold'>{filteredCampaigns.length}</span> of{' '}
          <span className='font-semibold'>{DUMMY_CAMPAIGNS.length}</span> campaigns
        </p>
      </div>

      {/* Campaigns Grid */}
      <div className='grid gap-6 md:grid-cols-2'>
        {filteredCampaigns.length > 0 ? (
          filteredCampaigns.map((campaign) => (
            <div
              key={campaign.id}
              className='rounded-lg border border-slate-200 bg-white p-6 hover:shadow-lg transition'
            >
              {/* Header */}
              <div className='flex items-start justify-between gap-3 mb-4'>
                <div className='flex-1'>
                  <h3 className='text-lg font-semibold text-slate-900'>{campaign.title}</h3>
                  <p className='mt-1 text-sm text-slate-500'>{campaign.description}</p>
                </div>
                <span
                  className={`inline-flex whitespace-nowrap rounded-full px-2 py-1 text-xs font-semibold ${getStatusColor(
                    campaign.status
                  )}`}
                >
                  {campaign.status}
                </span>
              </div>

              {/* Details Grid */}
              <div className='space-y-2 mb-4 text-sm'>
                <div className='flex items-center gap-2 text-slate-600'>
                  <FiCalendar className='h-4 w-4' />
                  <span>
                    {new Date(campaign.startDate).toLocaleDateString()} -{' '}
                    {new Date(campaign.endDate).toLocaleDateString()}
                  </span>
                </div>

                <div className='flex items-center gap-2 text-slate-600'>
                  <FiClock className='h-4 w-4' />
                  <span>
                    {campaign.startTime} - {campaign.endTime}
                  </span>
                </div>

                <div className='flex items-center gap-2 text-slate-600'>
                  <FiMapPin className='h-4 w-4' />
                  <span>{campaign.location}</span>
                </div>

                <div className='text-xs text-slate-500 pl-6'>
                  {campaign.address.sector}, {campaign.address.district}, {campaign.address.province}
                </div>
              </div>

              {/* Progress */}
              <div className='mb-4 space-y-2'>
                <div className='flex items-center justify-between text-sm'>
                  <span className='font-semibold text-slate-900'>Progress</span>
                  <span className='text-slate-600'>
                    {campaign.assessmentsRecorded} / {campaign.targetAssessments}
                  </span>
                </div>
                <ProgressBar value={campaign.progress} tone={getProgressBarTone(campaign.status)} />
                <p className='text-xs text-slate-500'>{campaign.progress}% complete</p>
              </div>

              {/* Action Button */}
              <button className='w-full rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50'>
                View Details
              </button>
            </div>
          ))
        ) : (
          <div className='col-span-full rounded-lg border border-slate-200 bg-slate-50 p-8 text-center'>
            <p className='text-sm text-slate-500'>No campaigns found matching your filters</p>
          </div>
        )}
      </div>
    </div>
  );
}
