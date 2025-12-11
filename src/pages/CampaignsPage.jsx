import { Link } from 'react-router-dom';
import { FiPlus } from 'react-icons/fi';
import { CampaignsGrid } from '../features/screeningCampaign';

export default function CampaignsPage() {
  return (
    <div className='space-y-8 max-w-[1600px] mx-auto'>
      <div className='surface-card p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white border border-slate-200'>
        <div>
          <h1 className='text-2xl font-semibold text-slate-900 mb-1'>Screening Campaigns</h1>
          <p className='text-slate-600 text-sm'>Manage and monitor NCD screening campaigns</p>
        </div>

        <Link
          to='/campaigns/create'
          className='inline-flex items-center gap-2 rounded border border-sky-600 bg-sky-600 px-4 py-2 text-white font-medium hover:bg-sky-700 transition-colors'
        >
          <FiPlus className='h-4 w-4' />
          Create Campaign
        </Link>
      </div>

      <CampaignsGrid />
    </div>
  );
}
