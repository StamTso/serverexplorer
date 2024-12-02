import { useAuthContext } from '../hooks/useAuthContext';

export const useLogout = () => {
    const { setToken } = useAuthContext();

    const handleLogout = () => {
        setToken(null);
    }

    return { handleLogout };
}