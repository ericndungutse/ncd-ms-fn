import { useState } from 'react';
import Badge from '../ui/Badge';
import { FiSearch } from 'react-icons/fi';

// Dummy assessment data
const DUMMY_ASSESSMENTS = [
  {
    id: '1',
    patientNumber: 'PN-001',
    indicator: 'Hypertension',
    readings: '165/102 mmHg',
    classification: 'Stage 2 Hypertension',
    date: '2025-12-11',
    campaign: 'Nyarugenge District Campaign',
    status: 'High Risk',
  },
  {
    id: '2',
    patientNumber: 'PN-002',
    indicator: 'Diabetes',
    readings: 'RBG 150 mg/dL',
    classification: 'Pre-diabetes',
    date: '2025-12-11',
    campaign: 'Gasabo Outreach',
    status: 'Medium Risk',
  },
  {
    id: '3',
    patientNumber: 'PN-003',
    indicator: 'BMI',
    readings: '28.3 kg/m²',
    classification: 'Overweight',
    date: '2025-12-10',
    campaign: 'Bugesera Mobile Campaign',
    status: 'Low Risk',
  },
  {
    id: '4',
    patientNumber: 'PN-004',
    indicator: 'Hypertension',
    readings: '140/90 mmHg',
    classification: 'Elevated',
    date: '2025-12-10',
    campaign: 'Nyarugenge District Campaign',
    status: 'Medium Risk',
  },
  {
    id: '5',
    patientNumber: 'PN-005',
    indicator: 'Cholesterol',
    readings: 'Total 240 mg/dL',
    classification: 'High',
    date: '2025-12-09',
    campaign: 'Gasabo Outreach',
    status: 'High Risk',
  },
  {
    id: '6',
    patientNumber: 'PN-006',
    indicator: 'Diabetes',
    readings: 'RBG 95 mg/dL',
    classification: 'Normal',
    date: '2025-12-09',
    campaign: 'Bugesera Mobile Campaign',
    status: 'Low Risk',
  },
];

export default function AssessmentsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterIndicator, setFilterIndicator] = useState('');
  const [filterStatus, setFilterStatus] = useState('');

  const filteredAssessments = DUMMY_ASSESSMENTS.filter((assessment) => {
    const matchesSearch =
      assessment.patientNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      assessment.indicator.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesIndicator = !filterIndicator || assessment.indicator === filterIndicator;
    const matchesStatus = !filterStatus || assessment.status === filterStatus;

    return matchesSearch && matchesIndicator && matchesStatus;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'High Risk':
        return 'bg-rose-100 text-rose-700';
      case 'Medium Risk':
        return 'bg-amber-100 text-amber-700';
      case 'Low Risk':
        return 'bg-teal-100 text-teal-700';
      default:
        return 'bg-slate-100 text-slate-700';
    }
  };

  const indicators = [...new Set(DUMMY_ASSESSMENTS.map((a) => a.indicator))];
  const statuses = [...new Set(DUMMY_ASSESSMENTS.map((a) => a.status))];

  return (
    <div className='space-y-6'>
      {/* Header */}
      <div>
        <h1 className='text-3xl font-bold text-slate-900'>Assessments</h1>
        <p className='mt-1 text-slate-500'>View and manage all health assessments</p>
      </div>

      {/* Filters */}
      <div className='grid gap-4 sm:grid-cols-2 lg:grid-cols-4'>
        {/* Search */}
        <div className='lg:col-span-2'>
          <div className='relative'>
            <FiSearch className='absolute left-3 top-3 h-5 w-5 text-slate-400' />
            <input
              type='text'
              placeholder='Search patient number or indicator...'
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className='w-full rounded-lg border border-slate-200 bg-white pl-10 pr-3 py-2 text-sm focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500'
            />
          </div>
        </div>

        {/* Indicator Filter */}
        <select
          value={filterIndicator}
          onChange={(e) => setFilterIndicator(e.target.value)}
          className='rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500'
        >
          <option value=''>All Indicators</option>
          {indicators.map((indicator) => (
            <option key={indicator} value={indicator}>
              {indicator}
            </option>
          ))}
        </select>

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
          Showing <span className='font-semibold'>{filteredAssessments.length}</span> of{' '}
          <span className='font-semibold'>{DUMMY_ASSESSMENTS.length}</span> assessments
        </p>
      </div>

      {/* Assessments Table */}
      <div className='overflow-hidden rounded-lg border border-slate-200 bg-white'>
        <div className='overflow-x-auto'>
          <table className='min-w-full divide-y divide-slate-200 text-sm'>
            <thead className='bg-slate-50 text-left text-xs font-semibold uppercase tracking-wide text-slate-600'>
              <tr>
                <th className='px-4 py-3'>Patient #</th>
                <th className='px-4 py-3'>Indicator</th>
                <th className='px-4 py-3'>Reading</th>
                <th className='px-4 py-3'>Classification</th>
                <th className='px-4 py-3'>Campaign</th>
                <th className='px-4 py-3'>Status</th>
                <th className='px-4 py-3'>Date</th>
              </tr>
            </thead>
            <tbody className='divide-y divide-slate-100 bg-white text-slate-700'>
              {filteredAssessments.length > 0 ? (
                filteredAssessments.map((assessment) => (
                  <tr key={assessment.id} className='hover:bg-slate-50'>
                    <td className='px-4 py-3 font-semibold'>{assessment.patientNumber}</td>
                    <td className='px-4 py-3'>{assessment.indicator}</td>
                    <td className='px-4 py-3 font-mono text-xs'>{assessment.readings}</td>
                    <td className='px-4 py-3 text-sm'>{assessment.classification}</td>
                    <td className='px-4 py-3 text-xs text-slate-500'>{assessment.campaign}</td>
                    <td className='px-4 py-3'>
                      <span
                        className={`inline-flex rounded-full px-2 py-1 text-xs font-semibold ${getStatusColor(
                          assessment.status
                        )}`}
                      >
                        {assessment.status}
                      </span>
                    </td>
                    <td className='px-4 py-3 text-sm'>{assessment.date}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan='7' className='px-4 py-8 text-center text-sm text-slate-500'>
                    No assessments found matching your filters
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
