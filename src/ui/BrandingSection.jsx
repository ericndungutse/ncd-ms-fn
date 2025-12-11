import { FiActivity, FiSend, FiUsers, FiBarChart2 } from 'react-icons/fi';
import FeatureItem from './FeatureItem';

export default function BrandingSection() {
  const features = [
    {
      title: 'AI Risk Detection',
      description: 'Instantly identifies abnormal BP, glucose, and BMI readings',
      icon: FiActivity,
    },
    {
      title: 'Automated Follow-Up',
      description: 'SMS reminders and personalised patient education',
      icon: FiSend,
    },
    {
      title: 'Real-Time Patient Tracking',
      description: 'Simple dashboards for clinicians and CHWs',
      icon: FiUsers,
    },
    {
      title: 'Statistical Intelligence',
      description: 'Generate insights for informed public health decision-making',
      icon: FiBarChart2,
    },
  ];

  return (
    <div className='hidden md:flex md:w-1/2 flex-col justify-center items-center px-6 md:px-10'>
      <div className='max-w-md w-full surface-quiet p-8 rounded border border-slate-200 space-y-6'>
        <div>
          <h1 className='text-3xl font-semibold text-slate-900 mb-2'>eRINDE AI</h1>
          <h2 className='text-lg font-medium text-slate-600'>Smart NCD Screening System</h2>
        </div>
        <p className='text-sm text-slate-600 leading-relaxed'>
          AI-powered early detection and follow-up for hypertension and diabetes—designed for field teams and health
          facilities to keep every community on track.
        </p>
        <div className='space-y-3 text-left'>
          {features.map((feature, index) => (
            <FeatureItem key={index} title={feature.title} description={feature.description} icon={feature.icon} />
          ))}
        </div>
      </div>
    </div>
  );
}
