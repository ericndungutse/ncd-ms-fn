import { Link } from 'react-router-dom';
import { CampaignsGrid } from '../features/screeningCampaign';

export default function CampaignsPage() {
  return (
    <div className='space-y-6'>
      <div className='flex items-center justify-between'>
        <div>
          <h1 className='text-3xl font-bold text-slate-900'>Screening Campaigns</h1>
          <p className='mt-1 text-slate-500'>Manage and monitor NCD screening campaigns</p>
        </div>

        <Link
          to='/campaigns/create'
          className='inline-flex items-center rounded-lg bg-blue-600 px-4 py-2 text-white font-medium hover:bg-blue-700 transition'
        >
          + Create Campaign
        </Link>
      </div>

      <CampaignsGrid />
    </div>
  );
}
