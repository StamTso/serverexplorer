import spinner from '../../assets/Spinner_Blue.png';
import { LoadingSpinnerProps } from './types';

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ message = 'Logging in' }) => {
    return (
        <div className='flex flex-col flex-1 items-center justify-center'>
            <div className='mb-4'>
                <img src={spinner} alt='' className='h-12 w-12 sm:h-16 sm:w-16 lg:h-20 lg:w-20 animate-spin' />
            </div>

            <p className='text-gray-600 text-xl sm:text-2xl'>{message}</p>
        </div>
    );
};

export default LoadingSpinner;
