import CampaignCard from './CampaignCard';
import EmptyState from '../../ui/EmptyState';
import { useFetchCampaigns } from './campaigns.queries';
import { getResponseData } from '../../utils/axios.utils';

const STATUS_TONE_MAP = {
  Completed: 'teal',
  Active: 'amber',
  Planned: 'slate',
};

export default function CampaignsGrid() {
  const { data, isLoading } = useFetchCampaigns();

  const campaignsData = getResponseData(data).data?.campaigns || [];

  if (!campaignsData?.length) {
    return <EmptyState title='No campaigns found' message='Try adjusting your search or status filters.' />;
  }

  return (
    <>
      <div className='flex items-center justify-between'>
        <p className='text-sm text-slate-500'>
          Showing <span className='font-semibold'>{campaignsData?.length}</span> campaigns
        </p>
      </div>

      <div className='grid gap-6 md:grid-cols-2'>
        {campaignsData.map((campaign) => (
          <CampaignCard key={campaign._id} campaign={campaign} tone={STATUS_TONE_MAP[campaign.status] || 'slate'} />
        ))}
      </div>
    </>
  );
}
