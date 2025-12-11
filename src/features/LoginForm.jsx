import FormButton from '../ui/FormButton';
import FormGroup from '../ui/FormGroup';
import FormInput from '../ui/FormInput';
import { useLogin } from './auth/auth.queries';

export default function LoginForm({ register, handleSubmit, errors }) {
  const { login } = useLogin();
  const onSubmit = async (data) => {
    login(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormGroup>
        <FormInput
          label='Email Address'
          id='email'
          type='email'
          placeholder='name@organization.com'
          register={register}
          registerOptions={{
            required: 'Email is required',
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: 'Please enter a valid email address',
            },
          }}
          error={errors.email}
        />

        <FormInput
          label='Password'
          id='password'
          type='password'
          placeholder='••••••••'
          register={register}
          registerOptions={{
            required: 'Password is required',
            minLength: {
              value: 6,
              message: 'Password must be at least 6 characters',
            },
          }}
          error={errors.password}
        />

        <FormButton>Log In</FormButton>
      </FormGroup>
    </form>
  );
}
