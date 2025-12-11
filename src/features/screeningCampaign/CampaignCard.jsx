import { FiMapPin, FiCalendar, FiClock } from 'react-icons/fi';
import ProgressBar from '../../ui/ProgressBar';
import StatusPill from '../../ui/StatusPill';
import IconText from '../../ui/IconText';

const formatDateRange = (startDate, endDate) => {
  const start = new Date(startDate).toLocaleDateString();
  const end = new Date(endDate).toLocaleDateString();
  return `${start} - ${end}`;
};

export default function CampaignCard({ campaign, tone }) {
  const progressTone = tone === 'slate' ? 'rose' : tone;

  return (
    <div className='rounded-lg border border-slate-200 bg-white p-6 hover:shadow-lg transition'>
      <div className='mb-4 flex items-start justify-between gap-3'>
        <div className='flex-1'>
          <h3 className='text-lg font-semibold text-slate-900'>{campaign.title}</h3>
          <p className='mt-1 text-sm text-slate-500'>{campaign.description}</p>
        </div>
        <StatusPill label={campaign.status} tone={tone} />
      </div>

      <div className='mb-4 space-y-2 text-sm'>
        <IconText icon={FiCalendar}>{formatDateRange(campaign.startDate, campaign.endDate)}</IconText>
        <IconText icon={FiClock}>
          {campaign.startTime} - {campaign.endTime}
        </IconText>
        <IconText icon={FiMapPin}>{campaign.location}</IconText>
        <p className='pl-6 text-xs text-slate-500'>
          {campaign.address.sector}, {campaign.address.district}, {campaign.address.province}
        </p>
      </div>

      <div className='mb-4 space-y-2'>
        <div className='flex items-center justify-between text-sm'>
          <span className='font-semibold text-slate-900'>Progress</span>
          <span className='text-slate-600'>
            {campaign.assessmentsRecorded} / {campaign.targetAssessments}
          </span>
        </div>
        <ProgressBar value={campaign.progress} tone={progressTone} />
        <p className='text-xs text-slate-500'>{campaign.progress}% complete</p>
      </div>

      <button className='w-full rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50'>
        View Details
      </button>
    </div>
  );
}
