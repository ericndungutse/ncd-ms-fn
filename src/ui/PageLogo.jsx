export default function PageLogo({ variant = 'desktop' }) {
  const sizeClasses = variant === 'mobile' ? 'h-16' : 'h-24';

  return (
    <div className={`${variant === 'mobile' ? 'md:hidden text-center mb-8' : 'hidden md:flex justify-center mb-8'}`}>
      <img
        src='/images/whatsapp-20image-202025-12-09-20at-2010.jpg'
        alt='NCDC Logo'
        className={`${sizeClasses} object-contain ${variant === 'desktop' ? 'drop-shadow-lg' : ''}`}
      />
    </div>
  );
}
