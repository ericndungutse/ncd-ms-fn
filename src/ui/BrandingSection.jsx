import PageLogo from './PageLogo';
import FeatureItem from './FeatureItem';

export default function BrandingSection() {
  const features = [
    {
      title: 'Centralized Data Management',
      description: 'Consolidate screening and surveillance data in one secure platform',
    },
    {
      title: 'Critical Case Tracking',
      description: 'Monitor patients showing critical conditions and follow-up on hospital admissions',
    },
    {
      title: 'Statistical Intelligence',
      description: 'Generate insights for informed public health decision-making',
    },
  ];

  return (
    <div className='hidden md:flex md:w-1/2 flex-col justify-center items-center px-12 text-white'>
      <div className='max-w-sm text-center'>
        <PageLogo variant='desktop' />
        <h1 className='text-4xl font-bold mb-4 text-balance'>NCDCs Management System</h1>
        <p className='text-lg text-slate-300 mb-8'>
          Centralize disease surveillance data, track critical cases in real-time, and empower public health
          decision-making with actionable insights.
        </p>
        <div className='space-y-4 text-left'>
          {features.map((feature, index) => (
            <FeatureItem key={index} title={feature.title} description={feature.description} />
          ))}
        </div>
      </div>
    </div>
  );
}
