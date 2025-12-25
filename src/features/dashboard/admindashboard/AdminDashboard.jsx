import { useState } from 'react';
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import {
  Activity,
  TrendingUp,
  Calendar,
  Users,
  ChevronRight,
  Filter,
  Download,
  ArrowUpRight,
  ArrowDownRight,
} from 'lucide-react';

const StatCard = ({ title, value, subtitle, icon: Icon, trend, color }) => (
  <div className='group relative overflow-hidden rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition-all hover:shadow-lg hover:border-gray-300'>
    <div className='flex items-start justify-between'>
      <div className='flex-1 space-y-2'>
        <p className='text-sm font-medium text-gray-600'>{title}</p>
        <p className='text-3xl font-bold tracking-tight text-gray-900'>{value}</p>
        <div className='flex items-center gap-2'>
          {trend && (
            <div
              className={`flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-semibold ${
                trend === 'up' ? 'bg-emerald-50 text-emerald-700' : 'bg-rose-50 text-rose-700'
              }`}
            >
              {trend === 'up' ? <ArrowUpRight className='h-3 w-3' /> : <ArrowDownRight className='h-3 w-3' />}
              {subtitle}
            </div>
          )}
          {!trend && <p className='text-xs text-gray-500'>{subtitle}</p>}
        </div>
      </div>
      <div
        className='flex h-12 w-12 items-center justify-center rounded-lg transition-transform group-hover:scale-110'
        style={{ backgroundColor: `${color}15` }}
      >
        <Icon className='h-6 w-6' style={{ color }} />
      </div>
    </div>
  </div>
);

export default function AdminDashboard() {
  const [selectedIndicator, setSelectedIndicator] = useState('BMI');
  const [timeRange, setTimeRange] = useState('14d');

  const assessmentsByIndicator = [
    { indicator: 'BMI', count: 1200 },
    { indicator: 'Hypertension', count: 950 },
    { indicator: 'Diabetes', count: 800 },
  ];

  const classificationDistribution = {
    BMI: [
      { label: 'Normal', count: 700, color: '#10b981' },
      { label: 'Overweight', count: 300, color: '#f59e0b' },
      { label: 'Obesity Class I', count: 100, color: '#ef4444' },
      { label: 'Obesity Class II', count: 100, color: '#dc2626' },
    ],
    Hypertension: [
      { label: 'Normal', count: 400, color: '#10b981' },
      { label: 'Stage 1', count: 350, color: '#f59e0b' },
      { label: 'Stage 2', count: 200, color: '#ef4444' },
    ],
    Diabetes: [
      { label: 'Normal', count: 500, color: '#10b981' },
      { label: 'Prediabetes', count: 200, color: '#f59e0b' },
      { label: 'Diabetes', count: 100, color: '#ef4444' },
    ],
  };

  const assessmentsOverTime = [
    { date: 'Dec 1', count: 50 },
    { date: 'Dec 2', count: 65 },
    { date: 'Dec 3', count: 58 },
    { date: 'Dec 4', count: 72 },
    { date: 'Dec 5', count: 68 },
    { date: 'Dec 6', count: 85 },
    { date: 'Dec 7', count: 90 },
    { date: 'Dec 8', count: 95 },
    { date: 'Dec 9', count: 88 },
    { date: 'Dec 10', count: 92 },
    { date: 'Dec 11', count: 105 },
    { date: 'Dec 12', count: 98 },
    { date: 'Dec 13', count: 110 },
    { date: 'Dec 14', count: 115 },
  ];

  const activeCampaigns = [
    {
      campaignId: 'abc123',
      title: 'Kigali Drive',
      startDate: '2025-12-10',
      endDate: '2025-12-20',
      progress: 65,
    },
    {
      campaignId: 'def456',
      title: 'Rural Outreach',
      startDate: '2025-12-15',
      endDate: '2025-12-25',
      progress: 40,
    },
  ];

  const upcomingCampaigns = [
    { campaignId: 'ghi789', title: 'Urban Health Week', startDate: '2026-01-05', endDate: '2026-01-12' },
  ];

  const campaignPlanning = { totalCampaigns: 12, active: 2, upcoming: 3, completed: 7 };

  const recentAssessments = [
    {
      patient: 'John Doe',
      indicator: 'BMI',
      classification: 'Overweight',
      date: '2025-12-19',
      time: '09:30 AM',
      risk: 'medium',
    },
    {
      patient: 'Jane Smith',
      indicator: 'Hypertension',
      classification: 'Stage 1',
      date: '2025-12-19',
      time: '10:15 AM',
      risk: 'medium',
    },
    {
      patient: 'Alice Johnson',
      indicator: 'Diabetes',
      classification: 'Normal',
      date: '2025-12-18',
      time: '02:45 PM',
      risk: 'low',
    },
    {
      patient: 'Bob Wilson',
      indicator: 'BMI',
      classification: 'Obesity Class I',
      date: '2025-12-18',
      time: '03:20 PM',
      risk: 'high',
    },
  ];

  const getRiskBadge = (risk) => {
    if (risk === 'low') return { bg: 'bg-emerald-50', text: 'text-emerald-700', border: 'border-emerald-200' };
    if (risk === 'medium') return { bg: 'bg-amber-50', text: 'text-amber-700', border: 'border-amber-200' };
    return { bg: 'bg-rose-50', text: 'text-rose-700', border: 'border-rose-200' };
  };

  return (
    <div className='min-h-screen bg-gray-50'>
      <div className='sticky top-0 z-10 border-b border-gray-200 bg-white/80 backdrop-blur-lg'>
        <div className='mx-auto max-w-[1800px] px-6 py-6'>
          <div className='flex flex-col gap-4 md:flex-row md:items-center md:justify-between'>
            <div>
              <h1 className='text-3xl font-bold tracking-tight text-balance text-gray-900'>NCDC Admin Dashboard</h1>
              <p className='mt-1 text-sm text-gray-600'>Health Monitoring & Campaign Management</p>
            </div>
            <div className='flex items-center gap-3'>
              <button className='flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition-all hover:bg-gray-50 hover:border-gray-400'>
                <Filter className='h-4 w-4' />
                Filter
              </button>
              <button className='flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-all hover:bg-blue-700 shadow-sm'>
                <Download className='h-4 w-4' />
                Export
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className='mx-auto max-w-[1800px] space-y-6 p-6'>
        <div className='grid gap-4 sm:grid-cols-2 lg:grid-cols-4'>
          <StatCard
            title='Total Assessments'
            value='2,950'
            subtitle='+12%'
            icon={Activity}
            trend='up'
            color='#3b82f6'
          />
          <StatCard
            title='Active Campaigns'
            value={campaignPlanning.active}
            subtitle={`${campaignPlanning.upcoming} upcoming`}
            icon={Calendar}
            color='#10b981'
          />
          <StatCard
            title='Total Campaigns'
            value={campaignPlanning.totalCampaigns}
            subtitle={`${campaignPlanning.completed} completed`}
            icon={TrendingUp}
            color='#8b5cf6'
          />
          <StatCard
            title='Patients Monitored'
            value='1,847'
            subtitle='Across all indicators'
            icon={Users}
            color='#f59e0b'
          />
        </div>

        <div className='grid gap-6 lg:grid-cols-2'>
          {/* Trend Chart */}
          <div className='rounded-xl border border-gray-200 bg-white p-6 shadow-sm'>
            <div className='mb-6 flex items-start justify-between'>
              <div>
                <h2 className='text-xl font-semibold text-gray-900'>Assessments Trend</h2>
                <p className='mt-1 text-sm text-gray-600'>Last 14 days of assessment activity</p>
              </div>
              <select
                value={timeRange}
                onChange={(e) => setTimeRange(e.target.value)}
                className='rounded-lg border border-gray-300 bg-white px-3 py-1.5 text-sm font-medium text-gray-700 outline-none transition-colors hover:border-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20'
              >
                <option value='7d'>7 days</option>
                <option value='14d'>14 days</option>
                <option value='30d'>30 days</option>
              </select>
            </div>
            <ResponsiveContainer width='100%' height={280}>
              <LineChart data={assessmentsOverTime}>
                <CartesianGrid strokeDasharray='3 3' stroke='#e5e7eb' />
                <XAxis dataKey='date' stroke='#6b7280' fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke='#6b7280' fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#ffffff',
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                  }}
                />
                <Line
                  type='monotone'
                  dataKey='count'
                  stroke='#3b82f6'
                  strokeWidth={3}
                  dot={{ fill: '#3b82f6', strokeWidth: 0, r: 4 }}
                  activeDot={{ r: 6, fill: '#2563eb' }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Bar Chart */}
          <div className='rounded-xl border border-gray-200 bg-white p-6 shadow-sm'>
            <div className='mb-6'>
              <h2 className='text-xl font-semibold text-gray-900'>Assessments by Indicator</h2>
              <p className='mt-1 text-sm text-gray-600'>Distribution across health indicators</p>
            </div>
            <ResponsiveContainer width='100%' height={280}>
              <BarChart data={assessmentsByIndicator}>
                <CartesianGrid strokeDasharray='3 3' stroke='#e5e7eb' />
                <XAxis dataKey='indicator' stroke='#6b7280' fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke='#6b7280' fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#ffffff',
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                  }}
                />
                <Bar dataKey='count' fill='#3b82f6' radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className='grid gap-6 lg:grid-cols-2'>
          {/* Classification Distribution */}
          <div className='rounded-xl border border-gray-200 bg-white p-6 shadow-sm'>
            <div className='mb-6'>
              <h2 className='text-xl font-semibold text-gray-900'>Classification Distribution</h2>
              <p className='mt-1 text-sm text-gray-600'>Health risk categories breakdown</p>
            </div>
            <select
              value={selectedIndicator}
              onChange={(e) => setSelectedIndicator(e.target.value)}
              className='mb-6 w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-700 outline-none transition-colors hover:border-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20'
            >
              <option>BMI</option>
              <option>Hypertension</option>
              <option>Diabetes</option>
            </select>

            <ResponsiveContainer width='100%' height={240}>
              <PieChart>
                <Pie
                  data={classificationDistribution[selectedIndicator]}
                  dataKey='count'
                  outerRadius={80}
                  innerRadius={50}
                  paddingAngle={2}
                  label={({ percent }) => `${(percent * 100).toFixed(0)}%`}
                >
                  {classificationDistribution[selectedIndicator].map((entry, i) => (
                    <Cell key={i} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#ffffff',
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                  }}
                />
              </PieChart>
            </ResponsiveContainer>

            <div className='mt-6 grid grid-cols-2 gap-3'>
              {classificationDistribution[selectedIndicator].map((entry, index) => (
                <div
                  key={index}
                  className='flex items-center gap-2 rounded-lg border border-gray-200 bg-gray-50 p-3 transition-colors hover:bg-gray-100'
                >
                  <div className='h-3 w-3 rounded-full' style={{ backgroundColor: entry.color }}></div>
                  <div className='flex-1'>
                    <p className='text-xs font-semibold text-gray-900'>{entry.label}</p>
                    <p className='text-xs text-gray-600'>{entry.count.toLocaleString()}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Campaign Management */}
          <div className='rounded-xl border border-gray-200 bg-white p-6 shadow-sm'>
            <div className='mb-6'>
              <h2 className='text-xl font-semibold text-gray-900'>Campaign Management</h2>
              <p className='mt-1 text-sm text-gray-600'>Active and upcoming health campaigns</p>
            </div>
            <div className='space-y-6'>
              {/* Active Campaigns */}
              <div>
                <div className='mb-3 flex items-center justify-between'>
                  <h3 className='text-xs font-bold uppercase tracking-wider text-gray-500'>Active</h3>
                  <span className='rounded-full bg-emerald-100 px-2.5 py-0.5 text-xs font-bold text-emerald-700'>
                    {activeCampaigns.length}
                  </span>
                </div>
                <div className='space-y-3'>
                  {activeCampaigns.map((c) => (
                    <div
                      key={c.campaignId}
                      className='group rounded-lg border border-gray-200 bg-linear-to-br from-emerald-50 to-white p-4 transition-all hover:border-emerald-300 hover:shadow-md'
                    >
                      <div className='flex items-start justify-between'>
                        <div className='flex-1'>
                          <p className='font-semibold text-gray-900'>{c.title}</p>
                          <p className='mt-1 text-xs text-gray-600'>
                            {c.startDate} → {c.endDate}
                          </p>
                          <div className='mt-3'>
                            <div className='flex items-center justify-between text-xs'>
                              <span className='font-medium text-gray-600'>Progress</span>
                              <span className='font-bold text-gray-900'>{c.progress}%</span>
                            </div>
                            <div className='mt-2 h-2 overflow-hidden rounded-full bg-gray-200'>
                              <div
                                className='h-full bg-linear-to-r from-emerald-500 to-emerald-600 transition-all'
                                style={{ width: `${c.progress}%` }}
                              />
                            </div>
                          </div>
                        </div>
                        <ChevronRight className='h-5 w-5 text-gray-400 transition-all group-hover:translate-x-1 group-hover:text-emerald-600' />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Upcoming Campaigns */}
              <div>
                <div className='mb-3 flex items-center justify-between'>
                  <h3 className='text-xs font-bold uppercase tracking-wider text-gray-500'>Upcoming</h3>
                  <span className='rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-bold text-blue-700'>
                    {upcomingCampaigns.length}
                  </span>
                </div>
                <div className='space-y-3'>
                  {upcomingCampaigns.map((c) => (
                    <div
                      key={c.campaignId}
                      className='group rounded-lg border border-gray-200 bg-linear-to-br from-blue-50 to-white p-4 transition-all hover:border-blue-300 hover:shadow-md'
                    >
                      <div className='flex items-start justify-between'>
                        <div>
                          <p className='font-semibold text-gray-900'>{c.title}</p>
                          <p className='mt-1 text-xs text-gray-600'>
                            {c.startDate} → {c.endDate}
                          </p>
                        </div>
                        <ChevronRight className='h-5 w-5 text-gray-400 transition-all group-hover:translate-x-1 group-hover:text-blue-600' />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className='rounded-xl border border-gray-200 bg-white p-6 shadow-sm'>
          <div className='mb-6 flex items-center justify-between'>
            <div>
              <h2 className='text-xl font-semibold text-gray-900'>Recent Assessments</h2>
              <p className='mt-1 text-sm text-gray-600'>Latest patient health evaluations</p>
            </div>
            <button className='flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium text-blue-600 transition-colors hover:bg-blue-50'>
              View All
              <ChevronRight className='h-4 w-4' />
            </button>
          </div>
          <div className='space-y-3'>
            {recentAssessments.map((a, i) => {
              const badge = getRiskBadge(a.risk);
              return (
                <div
                  key={i}
                  className='group flex items-center gap-4 rounded-lg border border-gray-200 bg-white p-4 transition-all hover:border-gray-300 hover:shadow-md'
                >
                  <div className='flex-1'>
                    <div className='flex items-center gap-3'>
                      <p className='font-semibold text-gray-900'>{a.patient}</p>
                      <span
                        className={`rounded-full border px-2.5 py-0.5 text-xs font-bold uppercase ${badge.bg} ${badge.text} ${badge.border}`}
                      >
                        {a.risk}
                      </span>
                    </div>
                    <div className='mt-1.5 flex items-center gap-2 text-sm'>
                      <span className='font-semibold text-blue-600'>{a.indicator}</span>
                      <span className='text-gray-400'>•</span>
                      <span className='text-gray-600'>{a.classification}</span>
                    </div>
                  </div>
                  <div className='text-right'>
                    <p className='text-sm font-semibold text-gray-900'>{a.date}</p>
                    <p className='text-xs text-gray-500'>{a.time}</p>
                  </div>
                  <ChevronRight className='h-5 w-5 text-gray-400 opacity-0 transition-all group-hover:translate-x-1 group-hover:opacity-100' />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
