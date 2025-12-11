import { useForm } from 'react-hook-form';
import BrandingSection from '../ui/BrandingSection';
import LoginFormContainer from '../ui/LoginFormContainer';
import SignInHeader from '../ui/SignInHeader';
import FooterLinks from '../ui/FooterLinks';
import Copyright from '../ui/Copyright';
import LoginForm from '../features/LoginForm';

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
    <div className='min-h-screen bg-linear-to-br from-slate-900 to-slate-800 flex'>
      <BrandingSection />

      <LoginFormContainer>
        <SignInHeader />
        <LoginForm register={register} handleSubmit={handleSubmit} errors={errors} />
        <FooterLinks />
        <Copyright />
      </LoginFormContainer>
    </div>
  );
}
