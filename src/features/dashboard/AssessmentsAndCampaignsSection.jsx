import Badge from '../../ui/Badge';
import Table from '../../ui/Table';
import ProgressBar from '../../ui/ProgressBar';
import { FiMapPin } from 'react-icons/fi';

export default function AssessmentsAndCampaignsSection() {
  const recentAssessments = [
    {
      patientNumber: 'PN-007',
      indicator: 'Hypertension',
      reading: '165/102 mmHg',
      classification: 'Stage 2',
      date: '2025-12-10',
    },
    {
      patientNumber: 'PN-014',
      indicator: 'Diabetes',
      reading: 'RBG 150 mg/dL',
      classification: 'Pre-diabetes',
      date: '2025-12-09',
    },
    {
      patientNumber: 'PN-021',
      indicator: 'BMI',
      reading: '28.3 kg/m²',
      classification: 'Overweight',
      date: '2025-12-08',
    },
  ];

  const campaigns = [
    {
      title: 'NCDC Screening Campaign Nyarugenge District',
      window: 'Feb 08 - Feb 13, 2025',
      status: 'Planned',
      location: 'CHUK',
      progress: 0,
    },
    {
      title: 'Gasabo Outreach Program',
      window: 'Jan 15 - Jan 21, 2025',
      status: 'Active',
      location: 'Remera PHC',
      progress: 68,
    },
    {
      title: 'Bugesera Mobile Campaign',
      window: 'Dec 10 - Dec 14, 2024',
      status: 'Completed',
      location: 'Nyamata grounds',
      progress: 100,
    },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'Completed':
        return 'bg-teal-100 text-teal-700';
      case 'Active':
        return 'bg-amber-100 text-amber-700';
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

  return (
    <section className='grid gap-6 xl:grid-cols-[1.5fr_1fr]'>
      {/* Recent assessments */}
      <div className='space-y-4 surface-card p-5 border border-slate-200'>
        <div className='flex items-center justify-between'>
          <div>
            <h3 className='text-lg font-semibold text-slate-900 mb-1'>Recent assessments</h3>
          </div>
          <Badge>From /api/v1/assessments</Badge>
        </div>
        <Table
          columns={[
            { key: 'patientNumber', label: 'Patient #' },
            { key: 'indicator', label: 'Indicator' },
            { key: 'reading', label: 'Reading' },
            { key: 'classification', label: 'Classification' },
            { key: 'date', label: 'Date' },
          ]}
          rows={recentAssessments}
        />
      </div>

      {/* Campaigns */}
      <div className='space-y-4 surface-card p-5 border border-slate-200'>
        <div className='flex items-center justify-between'>
          <div>
            <h3 className='text-lg font-semibold text-slate-900 mb-1'>Screening campaigns</h3>
          </div>
          <Badge>From /api/v1/screening-campaigns</Badge>
        </div>
        <div className='space-y-3'>
          {campaigns.map((campaign) => (
            <div key={campaign.title} className='rounded border border-slate-200 bg-white px-4 py-3'>
              <div className='flex items-center justify-between text-sm font-semibold text-slate-900'>
                <p className='truncate'>{campaign.title}</p>
                <span
                  className={`ml-2 whitespace-nowrap text-xs font-semibold px-2 py-1 rounded ${getStatusColor(
                    campaign.status
                  )}`}
                >
                  {campaign.status}
                </span>
              </div>
              <p className='text-xs text-slate-500'>{campaign.window}</p>
              <p className='mt-1 text-xs text-slate-500 flex items-center gap-2'>
                <FiMapPin className='h-3.5 w-3.5' />
                {campaign.location}
              </p>
              <div className='mt-2'>
                <ProgressBar value={campaign.progress} tone={getProgressBarTone(campaign.status)} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
