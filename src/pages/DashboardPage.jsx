import {
  FiActivity,
  FiAlertCircle,
  FiArrowUpRight,
  FiBarChart2,
  FiCheckCircle,
  FiClock,
  FiDatabase,
  FiHome,
  FiMapPin,
  FiPieChart,
  FiSearch,
  FiShield,
  FiUsers,
  FiUser,
} from 'react-icons/fi';

function StatCard({ title, value, delta, icon: Icon, tone = 'teal', hint }) {
  const tones = {
    teal: 'bg-teal-50 text-teal-700 border-teal-100',
    amber: 'bg-amber-50 text-amber-700 border-amber-100',
    rose: 'bg-rose-50 text-rose-700 border-rose-100',
    slate: 'bg-slate-50 text-slate-700 border-slate-100',
  };

  return (
    <div className={`rounded-lg border ${tones[tone]} p-4`}>
      <div className='flex items-start justify-between'>
        <div>
          <p className='text-sm text-slate-500'>{title}</p>
          <div className='mt-1 flex items-center gap-2'>
            <p className='text-3xl font-semibold text-slate-900'>{value}</p>
            {delta && (
              <span className='flex items-center gap-1 rounded-full bg-white px-2 py-1 text-xs font-semibold text-teal-700 ring-1 ring-teal-100'>
                <FiArrowUpRight />
                {delta}
              </span>
            )}
          </div>
          {hint && <p className='mt-1 text-xs text-slate-500'>{hint}</p>}
        </div>
        <div className='rounded-xl bg-white p-3 text-teal-600 ring-1 ring-slate-100'>
          <Icon className='h-5 w-5' />
        </div>
      </div>
    </div>
  );
}

function Badge({ children }) {
  return (
    <span className='inline-flex items-center rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700'>
      {children}
    </span>
  );
}

function Table({ columns, rows }) {
  return (
    <div className='overflow-hidden rounded-lg border border-slate-200 bg-white'>
      <div className='overflow-x-auto'>
        <table className='min-w-full divide-y divide-slate-200 text-sm'>
          <thead className='bg-slate-50 text-left text-xs font-semibold uppercase tracking-wide text-slate-600'>
            <tr>
              {columns.map((col) => (
                <th key={col.key} className='px-4 py-3'>
                  {col.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className='divide-y divide-slate-100 bg-white text-slate-700'>
            {rows.map((row, idx) => (
              <tr key={idx} className='hover:bg-slate-50'>
                {columns.map((col) => (
                  <td key={col.key} className='px-4 py-3'>
                    {row[col.key]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function ProgressBar({ value, tone = 'teal' }) {
  const tones = {
    teal: 'bg-teal-500',
    amber: 'bg-amber-500',
    rose: 'bg-rose-500',
  };
  return (
    <div className='h-2 rounded-full bg-slate-100'>
      <div className={`h-2 rounded-full ${tones[tone]}`} style={{ width: `${value}%` }} />
    </div>
  );
}

export default function DashboardPage() {
  const navItems = [
    { label: 'Overview', icon: FiHome, active: true },
    { label: 'Patients', icon: FiUsers },
    { label: 'Screenings', icon: FiBarChart2 },
    { label: 'Alerts', icon: FiAlertCircle },
  ];

  const user = {
    name: 'Dr. Amina',
    role: 'NCDC Admin',
  };

  const stats = [
    {
      title: 'Assessments logged',
      value: '1,284',
      delta: '+12%',
      icon: FiActivity,
      tone: 'teal',
      hint: 'From /api/v1/assessments',
    },
    {
      title: 'High-risk flagged',
      value: '182',
      delta: '+5%',
      icon: FiShield,
      tone: 'rose',
      hint: 'Elevated classifications',
    },
    {
      title: 'Screening campaigns',
      value: '12 active',
      delta: '+2',
      icon: FiPieChart,
      tone: 'amber',
      hint: 'From /api/v1/screening-campaigns',
    },
    { title: 'Registered users', value: '57', delta: '+4', icon: FiUsers, tone: 'slate', hint: 'From /api/v1/users' },
  ];

  const alertRows = [
    {
      state: 'Kigali City',
      signal: 'BP readings >160 in 3 sectors',
      priority: <Badge>High</Badge>,
      action: 'Escalate via escalation lane',
    },
    {
      state: 'Rwanda East',
      signal: 'Campaign uploads pending sync',
      priority: <Badge>Medium</Badge>,
      action: 'Ping CHW leads to retry',
    },
    {
      state: 'South West',
      signal: 'Missing BMI values in logs',
      priority: <Badge>Low</Badge>,
      action: 'Update indicator form v2',
    },
  ];

  const recentAssessments = [
    {
      patient: 'PN-007',
      indicator: 'Hypertension',
      reading: '165/102 mmHg',
      classification: 'Stage 2',
      status: 'Escalated',
    },
    {
      patient: 'PN-014',
      indicator: 'Diabetes',
      reading: 'RBG 150 mg/dL',
      classification: 'Pre-diabetes',
      status: 'Follow-up due',
    },
    {
      patient: 'PN-021',
      indicator: 'BMI',
      reading: '28.3 kg/m²',
      classification: 'Overweight',
      status: 'Coaching',
    },
  ];

  const campaigns = [
    { title: 'Nyarugenge District', window: 'Feb 08 - Feb 13', status: 'Planned', location: 'CHUK', progress: 32 },
    { title: 'Gasabo Outreach', window: 'Jan 15 - Jan 21', status: 'Active', location: 'Remera PHC', progress: 68 },
    {
      title: 'Bugesera Mobile',
      window: 'Dec 10 - Dec 14',
      status: 'Completed',
      location: 'Nyamata grounds',
      progress: 100,
    },
  ];

  return (
    <div className='flex min-h-screen bg-slate-50 text-slate-900'>
      {/* Sidebar */}
      <aside className='sticky top-0 hidden h-screen w-64 flex-col gap-6 overflow-y-auto border-r border-slate-200 bg-white/95 p-6 lg:flex'>
        <div>
          <h1 className='text-xl font-bold text-slate-900'>eRINDE AI</h1>
        </div>
        <nav className='space-y-2'>
          {navItems.map((item) => (
            <button
              key={item.label}
              className={`flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-semibold transition ${
                item.active
                  ? 'bg-emerald-50 text-emerald-700 ring-1 ring-emerald-100'
                  : 'text-slate-600 hover:bg-slate-50'
              }`}
              type='button'
            >
              <item.icon className='h-4 w-4' />
              {item.label}
            </button>
          ))}
        </nav>
        <div className='mt-auto rounded-lg border border-slate-100 bg-slate-50 p-4'>
          <p className='text-sm font-semibold text-slate-800'>Today&apos;s focus</p>
          <p className='mt-1 text-xs text-slate-500'>Monitor assessments and keep campaigns on schedule.</p>
        </div>
      </aside>

      {/* Main content */}
      <main className='flex-1 min-w-0'>
        {/* Header */}
        <header className='sticky top-0 z-20 flex items-center justify-between border-b border-slate-200 bg-white/95 px-6 py-4 backdrop-blur'>
          <div>
            <h1 className='text-2xl font-semibold text-slate-900'>NCDCs Management</h1>
            <p>Digitizing Non-Communicable Disease Care Services</p>
          </div>
          <div className='flex items-center gap-3'>
            <div className='flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-2'>
              <div className='flex h-9 w-9 items-center justify-center rounded-full bg-emerald-50 text-emerald-700 ring-1 ring-emerald-100'>
                <FiUser />
              </div>
              <div className='leading-tight'>
                <p className='text-sm font-semibold text-slate-900'>{user.name}</p>
                <p className='text-xs text-slate-500'>{user.role}</p>
              </div>
            </div>
          </div>
        </header>

        <div className='space-y-6 px-4 py-6 sm:px-6 lg:px-8'>
          {/* Stats */}
          <section className='grid gap-4 md:grid-cols-2 xl:grid-cols-4'>
            {stats.map((stat) => (
              <StatCard key={stat.title} {...stat} />
            ))}
          </section>

          <section className='grid gap-6 xl:grid-cols-[1.6fr_1fr]'>
            {/* Alerts table */}
            <div className='space-y-4 rounded-lg border border-slate-200 bg-white p-6'>
              <div className='flex items-center justify-between'>
                <div>
                  <p className='text-sm text-slate-500'>Signals from assessments</p>
                  <h3 className='text-lg font-semibold text-slate-900'>Operational alerts</h3>
                </div>
                <Badge>Based on indicators</Badge>
              </div>
              <Table
                columns={[
                  { key: 'state', label: 'Region' },
                  { key: 'signal', label: 'Signal' },
                  { key: 'priority', label: 'Priority' },
                  { key: 'action', label: 'Next step' },
                ]}
                rows={alertRows}
              />
            </div>

            {/* Data coverage */}
            <div className='space-y-4 rounded-lg border border-slate-200 bg-white p-6'>
              <div className='flex items-center justify-between'>
                <div>
                  <p className='text-sm text-slate-500'>Data freshness</p>
                  <h3 className='text-lg font-semibold text-slate-900'>Assessment sync</h3>
                </div>
                <Badge>API: /assessments</Badge>
              </div>
              <div className='space-y-3'>
                <div className='flex items-center justify-between rounded-lg border border-slate-100 bg-slate-50 px-4 py-3'>
                  <div className='flex items-center gap-3 text-sm font-semibold text-slate-900'>
                    <FiDatabase className='h-4 w-4 text-emerald-600' />
                    New records (24h)
                  </div>
                  <Badge>312</Badge>
                </div>
                <div className='flex items-center justify-between rounded-lg border border-slate-100 bg-slate-50 px-4 py-3'>
                  <div className='flex items-center gap-3 text-sm font-semibold text-slate-900'>
                    <FiActivity className='h-4 w-4 text-emerald-600' />
                    High-risk classifications
                  </div>
                  <Badge>46</Badge>
                </div>
                <div className='flex items-center justify-between rounded-lg border border-slate-100 bg-slate-50 px-4 py-3'>
                  <div className='flex items-center gap-3 text-sm font-semibold text-slate-900'>
                    <FiBarChart2 className='h-4 w-4 text-emerald-600' />
                    Indicators tracked
                  </div>
                  <Badge>6</Badge>
                </div>
              </div>
            </div>
          </section>

          <section className='grid gap-6 xl:grid-cols-[1.5fr_1fr]'>
            {/* Recent assessments */}
            <div className='space-y-4 rounded-lg border border-slate-200 bg-white p-6'>
              <div className='flex items-center justify-between'>
                <div>
                  <p className='text-sm text-slate-500'>Latest records</p>
                  <h3 className='text-lg font-semibold text-slate-900'>Recent assessments</h3>
                </div>
                <Badge>Sample from /assessments</Badge>
              </div>
              <Table
                columns={[
                  { key: 'patient', label: 'Patient #' },
                  { key: 'indicator', label: 'Indicator' },
                  { key: 'reading', label: 'Reading' },
                  { key: 'classification', label: 'Classification' },
                  { key: 'status', label: 'Status' },
                ]}
                rows={recentAssessments}
              />
            </div>

            {/* Campaigns */}
            <div className='space-y-4 rounded-lg border border-slate-200 bg-white p-6'>
              <div className='flex items-center justify-between'>
                <div>
                  <p className='text-sm text-slate-500'>Field operations</p>
                  <h3 className='text-lg font-semibold text-slate-900'>Screening campaigns</h3>
                </div>
                <Badge>From /screening-campaigns</Badge>
              </div>
              <div className='space-y-3'>
                {campaigns.map((campaign) => (
                  <div key={campaign.title} className='rounded-lg border border-slate-200 bg-slate-50 px-4 py-3'>
                    <div className='flex items-center justify-between text-sm font-semibold text-slate-900'>
                      <p>{campaign.title}</p>
                      <span className='text-emerald-600'>{campaign.status}</span>
                    </div>
                    <p className='text-xs text-slate-500'>{campaign.window}</p>
                    <p className='mt-1 text-xs text-slate-500 flex items-center gap-2'>
                      <FiMapPin className='h-3.5 w-3.5' />
                      {campaign.location}
                    </p>
                    <div className='mt-2'>
                      <ProgressBar
                        value={campaign.progress}
                        tone={
                          campaign.status === 'Completed' ? 'teal' : campaign.status === 'Active' ? 'amber' : 'rose'
                        }
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className='rounded-lg border border-slate-200 bg-white p-6'>
            <div className='flex items-center justify-between'>
              <div>
                <p className='text-sm text-slate-500'>Team actions</p>
                <h3 className='text-lg font-semibold text-slate-900'>Ops queue</h3>
              </div>
              <Badge>Next 4h</Badge>
            </div>
            <div className='mt-4 grid gap-3 md:grid-cols-3'>
              <div className='flex items-center gap-3 rounded-lg border border-slate-200 bg-slate-50 px-4 py-3'>
                <div className='flex h-10 w-10 items-center justify-center rounded-full bg-emerald-50 text-emerald-600 ring-1 ring-emerald-100'>
                  <FiCheckCircle />
                </div>
                <div className='flex-1'>
                  <p className='text-sm font-semibold text-slate-900'>Sync pending assessments</p>
                  <p className='text-xs text-slate-500'>Retry failed uploads</p>
                </div>
              </div>
              <div className='flex items-center gap-3 rounded-lg border border-slate-200 bg-slate-50 px-4 py-3'>
                <div className='flex h-10 w-10 items-center justify-center rounded-full bg-amber-50 text-amber-600 ring-1 ring-amber-100'>
                  <FiClock />
                </div>
                <div className='flex-1'>
                  <p className='text-sm font-semibold text-slate-900'>Schedule campaign kickoff</p>
                  <p className='text-xs text-slate-500'>Notify CHWs for Nyarugenge</p>
                </div>
              </div>
              <div className='flex items-center gap-3 rounded-lg border border-slate-200 bg-slate-50 px-4 py-3'>
                <div className='flex h-10 w-10 items-center justify-center rounded-full bg-rose-50 text-rose-600 ring-1 ring-rose-100'>
                  <FiAlertCircle />
                </div>
                <div className='flex-1'>
                  <p className='text-sm font-semibold text-slate-900'>Review high-risk queue</p>
                  <p className='text-xs text-slate-500'>Route to clinicians</p>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
