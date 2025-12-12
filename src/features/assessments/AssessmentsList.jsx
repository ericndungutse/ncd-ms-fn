import { useFetchAssessments } from './assessments.queries';
import EmptyState from '../../ui/EmptyState';
import StatusPill from '../../ui/StatusPill';
import Badge from '../../ui/Badge';

const formatDate = (value) => {
  if (!value) return '—';
  const d = new Date(value);
  return Number.isNaN(d.getTime())
    ? '—'
    : d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
};

export default function AssessmentsList() {
  const { data: assessments, isLoading, error } = useFetchAssessments();

  if (error) {
    return (
      <div className='rounded-lg border border-rose-200 bg-rose-50 p-4'>
        <p className='text-sm font-medium text-rose-700'>{error}</p>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className='rounded-lg border border-slate-200 bg-white overflow-hidden'>
        <div className='h-96 flex items-center justify-center'>
          <div className='text-center'>
            <div className='inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-sky-600 border-r-transparent mb-2'></div>
            <p className='text-sm text-slate-600'>Loading assessments...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!assessments || assessments.length === 0) {
    return <EmptyState title='No assessments found' message='No assessments have been recorded yet.' />;
  }

  return (
    <div className='rounded-lg border border-slate-200 bg-white overflow-hidden shadow-sm'>
      <div className='overflow-x-auto'>
        <table className='min-w-full divide-y divide-slate-200'>
          <thead className='bg-slate-50'>
            <tr>
              <th className='px-4 py-3 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider'>
                Patient #
              </th>
              <th className='px-4 py-3 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider'>
                Patient Name
              </th>
              <th className='px-4 py-3 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider'>
                Indicator
              </th>
              <th className='px-4 py-3 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider'>
                Readings
              </th>
              <th className='px-4 py-3 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider'>
                Classification
              </th>
              <th className='px-4 py-3 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider'>
                Campaign
              </th>
              <th className='px-4 py-3 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider'>
                Date
              </th>
            </tr>
          </thead>
          <tbody className='bg-white divide-y divide-slate-100'>
            {assessments.map((assessment) => {
              const indicatorName = assessment?.ncdcIndicatorId?.name || 'Unknown';
              const patientNumber = assessment?.patientNumber || 'N/A';
              const patientName = assessment?.profile?.firstName || 'Unknown';
              const campaignTitle = assessment?.screeningCampaignId?.title || 'N/A';
              const campaignStatus = assessment?.screeningCampaignId?.status;
              const classification = assessment?.classification || 'Not classified';
              const createdDate = formatDate(assessment?.createdAt);
              const readings = assessment?.readings ? Object.entries(assessment.readings) : [];

              return (
                <tr key={assessment._id} className='hover:bg-slate-50 transition-colors'>
                  <td className='px-4 py-4 whitespace-nowrap'>
                    <span className='text-sm font-semibold text-slate-900'>{patientNumber}</span>
                  </td>
                  <td className='px-4 py-4 whitespace-nowrap'>
                    <span className='text-sm font-medium text-slate-900'>{patientName}</span>
                  </td>
                  <td className='px-4 py-4'>
                    <span className='text-sm font-medium text-slate-900'>{indicatorName}</span>
                  </td>
                  <td className='px-4 py-4'>
                    {readings.length === 0 ? (
                      <span className='text-sm text-slate-400 italic'>No readings</span>
                    ) : (
                      <div className='space-y-1'>
                        {readings.map(([key, value]) => (
                          <div key={key} className='text-sm text-slate-700'>
                            <span className='font-medium'>{key}:</span> <span className='text-slate-900'>{value}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </td>
                  <td className='px-4 py-4'>
                    <Badge variant='info'>{classification}</Badge>
                  </td>
                  <td className='px-4 py-4'>
                    <div className='flex flex-col gap-1'>
                      <span className='text-sm text-slate-900'>{campaignTitle}</span>
                      {campaignStatus && <StatusPill status={campaignStatus} />}
                    </div>
                  </td>
                  <td className='px-4 py-4 whitespace-nowrap'>
                    <span className='text-sm text-slate-600'>{createdDate}</span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
