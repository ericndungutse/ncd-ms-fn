import { useForm } from 'react-hook-form';
import BrandingSection from '../ui/BrandingSection';
import LoginFormContainer from '../ui/LoginFormContainer';
import SignInHeader from '../ui/SignInHeader';
import FooterLinks from '../ui/FooterLinks';
import Copyright from '../ui/Copyright';
import LoginForm from '../features/auth/LoginForm';

export default function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  return (
    <div className='min-h-screen flex bg-slate-50'>
      <div className='max-w-6xl w-full mx-auto flex flex-col md:flex-row items-center justify-center gap-10 px-6 py-12'>
        <BrandingSection />

        <LoginFormContainer>
          <SignInHeader />
          <LoginForm register={register} handleSubmit={handleSubmit} errors={errors} />
          <FooterLinks />
          <Copyright />
        </LoginFormContainer>
      </div>
    </div>
  );
}
