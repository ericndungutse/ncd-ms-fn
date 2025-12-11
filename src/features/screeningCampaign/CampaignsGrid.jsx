import CampaignCard from './CampaignCard';
import EmptyState from '../../ui/EmptyState';

export default function CampaignsGrid({ campaigns, statusToneMap }) {
  if (!campaigns?.length) {
    return <EmptyState title='No campaigns found' message='Try adjusting your search or status filters.' />;
  }

  return (
    <div className='grid gap-6 md:grid-cols-2'>
      {campaigns.map((campaign) => (
        <CampaignCard key={campaign._id} campaign={campaign} tone={statusToneMap[campaign.status] || 'slate'} />
      ))}
    </div>
  );
}
