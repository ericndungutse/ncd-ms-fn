import { CampaignsGrid } from '../features/screeningCampaign';

export default function CampaignsPage() {
  return (
    <div className='space-y-6'>
      <div>
        <h1 className='text-3xl font-bold text-slate-900'>Screening Campaigns</h1>
        <p className='mt-1 text-slate-500'>Manage and monitor NCD screening campaigns</p>
      </div>

      <CampaignsGrid />
    </div>
  );
}
