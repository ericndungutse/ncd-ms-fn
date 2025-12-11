import StatCard from './StatCard';
import { FiActivity, FiDatabase, FiMapPin, FiAlertCircle } from 'react-icons/fi';

export default function StatsSection() {
  const stats = [
    {
      title: 'Health Assessments',
      value: '24',
      delta: '+8',
      icon: FiActivity,
      tone: 'teal',
      hint: 'Medical assessments recorded',
    },
    {
      title: 'Indicators Tracked',
      value: '6',
      icon: FiDatabase,
      tone: 'slate',
      hint: 'Hypertension, Diabetes, BMI, etc.',
    },
    {
      title: 'Active Campaigns',
      value: '3',
      icon: FiMapPin,
      tone: 'amber',
      hint: 'Screening campaigns in progress',
    },
    {
      title: 'High-Risk Cases',
      value: '5',
      delta: '+2',
      icon: FiAlertCircle,
      tone: 'rose',
      hint: 'Require clinical follow-up',
    },
  ];

  return (
    <section className='grid gap-4 md:grid-cols-2 xl:grid-cols-4'>
      {stats.map((stat) => (
        <StatCard key={stat.title} {...stat} />
      ))}
    </section>
  );
}
