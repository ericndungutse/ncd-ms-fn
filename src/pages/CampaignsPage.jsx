import { CampaignsGrid } from '../features/screeningCampaign';

// Dummy campaigns data
const DUMMY_CAMPAIGNS = [
  {
    id: '1',
    title: 'NCDC Screening Campaign Nyarugenge District',
    description: 'A district-wide outreach program for NCD screening.',
    startDate: '2025-02-08',
    endDate: '2025-02-13',
    startTime: '08:00',
    endTime: '17:00',
    location: 'Kigali University Teaching Hospital (CHUK)',
    status: 'Planned',
    progress: 0,
    address: {
      province: 'Kigali City',
      district: 'Nyarugenge',
      sector: 'Muhima',
      cell: 'Kiyovu',
      village: 'Kiyovu Village',
    },
    assessmentsRecorded: 0,
    targetAssessments: 100,
  },
  {
    id: '2',
    title: 'Gasabo Outreach Program',
    description: 'Mobile screening unit visiting health centers in Gasabo.',
    startDate: '2025-01-15',
    endDate: '2025-01-21',
    startTime: '09:00',
    endTime: '16:00',
    location: 'Remera PHC',
    status: 'Active',
    progress: 68,
    address: {
      province: 'Kigali City',
      district: 'Gasabo',
      sector: 'Remera',
      cell: 'Rusororo',
      village: 'Remera',
    },
    assessmentsRecorded: 68,
    targetAssessments: 100,
  },
  {
    id: '3',
    title: 'Bugesera Mobile Campaign',
    description: 'Community-based screening initiative in Bugesera district.',
    startDate: '2024-12-10',
    endDate: '2024-12-14',
    startTime: '08:00',
    endTime: '17:00',
    location: 'Nyamata grounds',
    status: 'Completed',
    progress: 100,
    address: {
      province: 'Eastern Province',
      district: 'Bugesera',
      sector: 'Nyamata',
      cell: 'Central',
      village: 'Nyamata',
    },
    assessmentsRecorded: 125,
    targetAssessments: 125,
  },
  {
    id: '4',
    title: 'Kicukiro Health Center Campaign',
    description: 'Screening campaign at Kicukiro health center.',
    startDate: '2025-01-25',
    endDate: '2025-02-05',
    startTime: '07:00',
    endTime: '18:00',
    location: 'Kicukiro Health Center',
    status: 'Active',
    progress: 45,
    address: {
      province: 'Kigali City',
      district: 'Kicukiro',
      sector: 'Kicukiro',
      cell: 'Gatenga',
      village: 'Gatenga',
    },
    assessmentsRecorded: 45,
    targetAssessments: 100,
  },
  {
    id: '5',
    title: 'Musanze District NCD Initiative',
    description: 'Large-scale screening initiative in northern region.',
    startDate: '2025-03-01',
    endDate: '2025-03-14',
    startTime: '08:00',
    endTime: '17:00',
    location: 'Musanze Central Hospital',
    status: 'Planned',
    progress: 0,
    address: {
      province: 'Northern Province',
      district: 'Musanze',
      sector: 'Musanze',
      cell: 'Central',
      village: 'Ruhengeri',
    },
    assessmentsRecorded: 0,
    targetAssessments: 150,
  },
];

const STATUS_TONE_MAP = {
  Completed: 'teal',
  Active: 'amber',
  Planned: 'slate',
};

export default function CampaignsPage() {
  return (
    <div className='space-y-6'>
      <div>
        <h1 className='text-3xl font-bold text-slate-900'>Screening Campaigns</h1>
        <p className='mt-1 text-slate-500'>Manage and monitor NCD screening campaigns</p>
      </div>

      <div className='flex items-center justify-between'>
        <p className='text-sm text-slate-500'>
          Showing <span className='font-semibold'>{DUMMY_CAMPAIGNS.length}</span> campaigns
        </p>
      </div>

      <CampaignsGrid campaigns={DUMMY_CAMPAIGNS} statusToneMap={STATUS_TONE_MAP} />
    </div>
  );
}
