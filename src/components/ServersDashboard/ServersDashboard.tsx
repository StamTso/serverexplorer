import ServersList from './ServersList';
import NavBar from '../common/NavBar';
import { useLogout } from '../../hooks/useLogout';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useServerContext } from '../../hooks/useServerContext';
import { useAuthContext } from '../../hooks/useAuthContext';
import { LOGIN_PATH } from '../../constants/routerConstants';

const ServersDashboard: React.FC = () => {
    const { handleLogout } = useLogout();
    const navigate = useNavigate();
    const {servers, fetchServers} = useServerContext();
    const {token} = useAuthContext();

    useEffect(() => {
        const fetch = async () => {
            if(token) await fetchServers(token);
        }
        fetch();
    }, [])
    
    const onLogout = () => {
        handleLogout();
        navigate(LOGIN_PATH);
    };

    return (
        <div className='min-h-screen bg-gray-100'>
            <NavBar onLogout={onLogout} />
            <h2 className='text-center text-2xl sm:text-3xl font-bold text-gray-800 mt-12 mb-3'>Server list</h2>
            <p className='text-center text-md sm:text-l text-gray-800 mb-6'>The distance between you and the server</p>
            <div className='p-6'>
                <ServersList servers={servers || []} />
            </div>
        </div>
    );
};

export default ServersDashboard;
