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
    <div className='space-y-8 max-w-[1600px] mx-auto'>
      {/* Header */}
      <div className='surface-card p-5 bg-white border border-slate-200'>
        <h1 className='text-2xl font-semibold text-slate-900 mb-1'>Assessments</h1>
        <p className='text-slate-600 text-sm'>
          View and manage all health assessments
        </p>
      </div>

      {/* Filters */}
      <div className='surface-card p-5 space-y-4 border border-slate-200'>
        <div className='grid gap-4 sm:grid-cols-2 lg:grid-cols-4'>
          {/* Search */}
          <div className='lg:col-span-2'>
            <div className='relative'>
              <FiSearch className='absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400' />
              <input
                type='text'
                placeholder='Search patient number or indicator...'
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className='w-full rounded border border-slate-200 bg-white pl-11 pr-4 py-2.5 text-sm focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-100 transition-colors'
              />
            </div>
          </div>

          {/* Indicator Filter */}
          <select
            value={filterIndicator}
            onChange={(e) => setFilterIndicator(e.target.value)}
            className='rounded border border-slate-200 bg-white px-4 py-2.5 text-sm focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-100 transition-colors'
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
            className='rounded border border-slate-200 bg-white px-4 py-2.5 text-sm focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-100 transition-colors'
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
        <div className='flex items-center justify-between text-sm text-slate-600'>
          <p>
            Showing <span className='font-bold text-slate-900'>{filteredAssessments.length}</span> of{' '}
            <span className='font-bold text-slate-900'>{DUMMY_ASSESSMENTS.length}</span> assessments
          </p>
          <p className='text-sky-600 font-semibold hidden sm:block'>Updated just now</p>
        </div>
      </div>

      {/* Assessments Table */}
      <div
        className='overflow-hidden rounded border border-slate-200 bg-white'
      >
        <div className='overflow-x-auto'>
          <table className='min-w-full divide-y divide-slate-200 text-sm'>
            <thead className='bg-linear-to-r from-slate-50 to-slate-100/50 text-left text-xs font-bold uppercase tracking-wide text-slate-700'>
              <tr>
                <th className='px-5 py-4'>Patient #</th>
                <th className='px-5 py-4'>Indicator</th>
                <th className='px-5 py-4'>Reading</th>
                <th className='px-5 py-4'>Classification</th>
                <th className='px-5 py-4'>Campaign</th>
                <th className='px-5 py-4'>Status</th>
                <th className='px-5 py-4'>Date</th>
              </tr>
            </thead>
            <tbody className='divide-y divide-slate-100 bg-white text-slate-700'>
              {filteredAssessments.length > 0 ? (
                filteredAssessments.map((assessment) => (
                  <tr key={assessment.id} className='hover:bg-slate-50/50 transition-colors duration-200'>
                    <td className='px-5 py-4 font-bold text-slate-900'>{assessment.patientNumber}</td>
                    <td className='px-5 py-4 font-medium'>{assessment.indicator}</td>
                    <td className='px-5 py-4 font-mono text-xs font-semibold'>{assessment.readings}</td>
                    <td className='px-5 py-4 text-sm'>{assessment.classification}</td>
                    <td className='px-5 py-4 text-xs text-slate-500'>{assessment.campaign}</td>
                    <td className='px-5 py-4'>
                      <span
                        className={`inline-flex rounded-full px-3 py-1.5 text-xs font-bold shadow-sm ring-1 ${getStatusColor(
                          assessment.status
                        )}`}
                      >
                        {assessment.status}
                      </span>
                    </td>
                    <td className='px-5 py-4 text-sm'>{assessment.date}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan='7' className='px-5 py-12 text-center'>
                    <div className='mx-auto max-w-md'>
                      <div className='mx-auto mb-4 h-16 w-16 rounded-full bg-slate-100 flex items-center justify-center'>
                        <FiSearch className='h-8 w-8 text-slate-400' />
                      </div>
                      <p className='text-sm font-semibold text-slate-900 mb-1'>No assessments found</p>
                      <p className='text-sm text-slate-500'>Try adjusting your filters</p>
                    </div>
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
