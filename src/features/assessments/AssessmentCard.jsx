import StatusPill from '../../ui/StatusPill';

const formatDate = (value) => {
  if (!value) return '—';
  const d = new Date(value);
  return Number.isNaN(d.getTime()) ? '—' : d.toLocaleDateString();
};

export default function AssessmentCard({ assessment }) {
  const indicatorName = assessment?.ncdcIndicatorId?.name || 'Unknown indicator';
  const patientNumber = assessment?.patientNumber || 'N/A';
  const campaignTitle = assessment?.screeningCampaignId?.title || 'N/A';
  const campaignStatus = assessment?.screeningCampaignId?.status;
  const classification = assessment?.classification || 'Not classified yet';
  const creator = assessment?.profile?.firstName || 'Unknown';
  const createdDate = formatDate(assessment?.createdAt);

  const readings = assessment?.readings ? Object.entries(assessment.readings) : [];

  return (
    <div className='rounded-lg border border-slate-200 bg-white p-5 shadow-sm hover:shadow-md transition-shadow'>
      <div className='flex items-start justify-between gap-3 mb-4'>
        <div>
          <p className='text-xs font-semibold uppercase tracking-wide text-slate-500 mb-1'>Indicator</p>
          <h3 className='text-lg font-semibold text-slate-900'>{indicatorName}</h3>
        </div>
        <div className='text-right'>
          <p className='text-xs text-slate-500'>Patient</p>
          <p className='text-sm font-semibold text-slate-800'>{patientNumber}</p>
        </div>
      </div>

      <div className='space-y-2 mb-4'>
        <div className='flex items-center justify-between text-sm'>
          <span className='text-slate-600'>Campaign</span>
          <div className='flex items-center gap-2'>
            {campaignStatus && <StatusPill status={campaignStatus} />}
            <span className='font-medium text-slate-900'>{campaignTitle}</span>
          </div>
        </div>
        <div className='flex items-center justify-between text-sm'>
          <span className='text-slate-600'>Created</span>
          <span className='font-medium text-slate-900'>{createdDate}</span>
        </div>
        <div className='flex items-center justify-between text-sm'>
          <span className='text-slate-600'>By</span>
          <span className='font-medium text-slate-900'>{creator}</span>
        </div>
      </div>

      <div className='space-y-2 mb-4'>
        <p className='text-xs font-semibold uppercase tracking-wide text-slate-500'>Readings</p>
        {readings.length === 0 ? (
          <p className='text-sm text-slate-500 italic'>No readings recorded</p>
        ) : (
          <div className='space-y-2'>
            {readings.map(([key, value]) => (
              <div
                key={key}
                className='flex items-center justify-between rounded border border-slate-200 bg-slate-50 px-3 py-2 text-sm'
              >
                <span className='text-slate-700'>{key}</span>
                <span className='font-semibold text-slate-900'>{value}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className='rounded border border-slate-200 bg-slate-50 px-3 py-2'>
        <p className='text-xs font-semibold uppercase tracking-wide text-slate-500 mb-1'>Classification</p>
        <p className='text-sm font-medium text-slate-900'>{classification}</p>
      </div>
    </div>
  );
}
