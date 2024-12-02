import { useForm, SubmitHandler } from 'react-hook-form';
import { useLogin } from '../../hooks/useLogin';
import { useNavigate } from 'react-router-dom';
import LoadingSpinner from './LoadingSpinner';
import ActionButton from '../common/ActionButton';
import { LoginFormData } from './types';
import logo from '../../assets/Dev_Logo.png'
import { SERVERS_LIST_PATH } from '../../constants/routerConstants';

const LoginForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    clearErrors
  } = useForm<LoginFormData>();

  const { handleLogin, loading, loginError } = useLogin();
  const navigate = useNavigate();


  const handleFormSubmit: SubmitHandler<LoginFormData> = (data) => {
    clearErrors();
    handleLogin({
      username: data.username,
      password: data.password
    }).then(() => {
      navigate(SERVERS_LIST_PATH);
    }).catch((error) => {
      console.log(error);
    });
  };

  return (
    <div className='flex items-center justify-center h-screen w-full bg-gray-100 p-4'>
      <div className='flex flex-col w-full max-w-md p-6 bg-white rounded-lg shadow-lg min-h-[34rem]'>

        <div className='flex justify-center mb-6'>
          <img src={logo} alt='' className='h-16 w-auto' />
        </div>

        {
          loading ? <LoadingSpinner /> :
            <form
              onSubmit={handleSubmit(handleFormSubmit)}
            >
              <h2 className='text-2xl font-bold text-center text-gray-800 mb-4'>
                Welcome back!
              </h2>
              <p className='text-l text-center text-gray-600 mb-6'>
                Enter details below to log in to your account.
              </p>

              <div className='mb-4'>
                <label htmlFor='email' className='block text-m text-gray-600 mb-1' id='usernameLabel'>
                  Username *
                </label>
                <input
                  type='text'
                  id='username'
                  {
                  ...register('username', {
                    required: 'Username is required',
                  })
                  }
                  className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring mb-4 min-h-12 placeholder-gray-300 ${errors.username ? 'border-red-500 focus:ring-red-300' : 'border-gray-200 focus:ring-blue-300'
                    }`}
                  placeholder='Enter username'
                  aria-invalid={!!errors.username}
                  aria-describedby={errors.username ? 'username-error' : undefined}
                  aria-labelledby='usernameLabel'
                />
                {errors.username && (
                  <p id='username-error' className='text-sm text-red-500 mt-1'>
                    {errors.username.message}
                  </p>
                )}
              </div>

              <div className='mb-6'>
                <label htmlFor='password' className='block text-m text-gray-600 mb-1' id='passwordLabel'>
                  Password *
                </label>
                <input
                  type='password'
                  id='password'
                  {...register('password', {
                    required: 'Password is required.'
                  })}
                  className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring mb-6 min-h-12 placeholder-gray-300 ${errors.password ? 'border-red-500 focus:ring-red-300' : 'border-gray-200 focus:ring-blue-300'
                    }`}
                  placeholder='Enter password'
                  aria-invalid={!!errors.password}
                  aria-describedby={errors.password ? 'password-error' : undefined}
                  aria-labelledby='passwordLabel'
                />
                {errors.password && (
                  <p id='password-error' className='text-sm text-red-500 mt-1'>
                    {errors.password.message}
                  </p>
                )}
              </div>

              <ActionButton
                type='submit'
                stylingClasses='w-full py-3 text-white bg-blue-600 rounded-full hover:bg-blue-900 active:bg-blue-500 disabled:bg-gray-600 transition mb-6'
                disabled={loading}
                title='Log in'
              />
              {loginError && <p className='text-center text-red-500' role='alert'>Login failed, username and/or password are incorrect.</p>}
            </form>
        }
      </div>
    </div>
  );
};

export default LoginForm;