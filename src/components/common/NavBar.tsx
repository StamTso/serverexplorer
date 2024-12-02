import logo from '../../assets/Dev_Logo.png'
import ActionButton from './ActionButton';

interface NavBarProps {
  onLogout: () => void;
}

const NavBar: React.FC<NavBarProps> = ({ onLogout }) => {
  return (
    <nav className='flex justify-between items-center px-6 py-4 bg-white shadow'>
      <div>
        <img src={logo} alt='' className='h-8 w-auto sm:h-12' role='img'/>
      </div>
      <ActionButton
        title='Log out'
        onClick={onLogout}
        stylingClasses='text-md  bg-white font-bold text-gray-800 px-4 py-2 rounded-full outline outline-1 outline-gray-300 hover:bg-gray-200'
      />
    </nav>
  );
};

export default NavBar;
