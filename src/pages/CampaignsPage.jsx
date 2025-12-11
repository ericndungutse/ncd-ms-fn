import { CampaignsGrid } from '../features/screeningCampaign';
import { useFetchCampaigns } from '../features/screeningCampaign/campaigns.queries';
import { getResponseData } from '../utils/axios.utils';

const STATUS_TONE_MAP = {
  Completed: 'teal',
  Active: 'amber',
  Planned: 'slate',
};

export default function CampaignsPage() {
  const { campaigns, isLoading, error } = useFetchCampaigns();

  const campaignsData = getResponseData(campaigns).data?.campaigns || [];

  return (
    <div className='space-y-6'>
      <div>
        <h1 className='text-3xl font-bold text-slate-900'>Screening Campaigns</h1>
        <p className='mt-1 text-slate-500'>Manage and monitor NCD screening campaigns</p>
      </div>

      <div className='flex items-center justify-between'>
        <p className='text-sm text-slate-500'>
          Showing <span className='font-semibold'>{campaignsData?.length}</span> campaigns
        </p>
      </div>

      <CampaignsGrid campaigns={campaignsData} statusToneMap={STATUS_TONE_MAP} />
    </div>
  );
}
