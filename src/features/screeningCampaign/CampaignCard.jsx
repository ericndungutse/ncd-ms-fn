import { FiMapPin, FiCalendar, FiClock, FiArrowRight } from 'react-icons/fi';
import ProgressBar from '../../ui/ProgressBar';
import StatusPill from '../../ui/StatusPill';
import IconText from '../../ui/IconText';

const formatDateRange = (startDate, endDate) => {
  const start = new Date(startDate).toLocaleDateString();
  const end = new Date(endDate).toLocaleDateString();
  return `${start} - ${end}`;
};

export default function CampaignCard({ campaign, tone }) {
  // const progressTone = tone === 'slate' ? 'rose' : tone;

  return (
    <div className='group relative rounded-2xl border border-slate-200 bg-white p-6 shadow-soft transition-all duration-300 hover-lift cursor-pointer overflow-hidden'>
      {/* Gradient overlay on hover */}
      <div className='absolute inset-0 bg-linear-to-br from-teal-50/50 to-emerald-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300'></div>

      <div className='relative'>
        <div className='mb-4 flex items-start justify-between gap-3'>
          <div className='flex-1'>
            <h3 className='text-lg font-bold text-slate-900 group-hover:text-teal-700 transition-colors duration-300'>
              {campaign.title}
            </h3>
            <p className='mt-2 text-sm text-slate-600 leading-relaxed'>{campaign.description}</p>
          </div>
          <StatusPill label={campaign.status} tone={tone} />
        </div>

        <div className='mb-5 space-y-3 text-sm'>
          <IconText icon={FiCalendar}>{formatDateRange(campaign.startDate, campaign.endDate)}</IconText>
          <IconText icon={FiClock}>
            {campaign.startTime} - {campaign.endTime}
          </IconText>
          <IconText icon={FiMapPin}>{campaign.location}</IconText>
          <p className='pl-6 text-xs text-slate-500 leading-relaxed'>
            {campaign.address.sector}, {campaign.address.district}, {campaign.address.province}
          </p>
        </div>

        <div className='mb-5 space-y-2'>
          <div className='flex items-center justify-between text-sm'>
            <span className='font-semibold text-slate-900'>Progress</span>
            {/* <span className='text-slate-600'>
              {campaign.assessmentsRecorded} / {campaign.targetAssessments}
            </span> */}
          </div>
          {/* <ProgressBar value={campaign.progress} tone={progressTone} /> */}
          {/* <p className='text-xs text-slate-500'>{campaign.progress}% complete</p> */}
        </div>

        <button className='group/btn w-full flex items-center justify-center gap-2 rounded-xl border-2 border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700 hover:border-sky-500 hover:bg-sky-50 hover:text-sky-700 transition-all duration-300 active:scale-95 shadow-soft'>
          View Details
          <FiArrowRight className='h-4 w-4 group-hover/btn:translate-x-1 transition-transform duration-300' />
        </button>
      </div>
    </div>
  );
}
