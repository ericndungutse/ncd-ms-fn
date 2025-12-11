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

  //   AI Risk Detection
  // Instantly identifies abnormal BP, glucose, and BMI readings

  // Automated Follow-Up
  // SMS reminders and personnalised patient education

  // Real-Time Patient Tracking
  // Simple dashboards for clinicians and CHWs

  return (
    <div className='hidden md:flex md:w-1/2 flex-col justify-center items-center px-12 text-white'>
      <div className='max-w-sm text-left'>
        {/* <PageLogo variant='desktop' /> */}
        <h1 className='text-4xl font-bold text-balance'>eRINDE AI</h1>
        <h2 className='text-lg font-semibold -mt-1 mb-4 text-balance'>Smart NCD Screening System</h2>
        <p className='text-lg text-slate-300 mb-8'>
          I-powered early detection and follow-up for hypertension and diabetes – ensuring timely care for every
          community, including those in remote areas.
        </p>
        <div className='space-y-4 text-left'>
          {features.map((feature, index) => (
            <FeatureItem key={index} title={feature.title} description={feature.description} icon={feature.icon} />
          ))}
        </div>
      </div>
    </div>
  );
}
