import { useState } from 'react';
import { useAuthContext } from '../hooks/useAuthContext';
import { login as loginService} from '../services/authService';
import { LoginPayload, AuthResponse } from '../types/auth';

export const useLogin = () => {
  const [loading, setLoading] = useState(false);
  const [loginError, setLoginError] = useState<string | null>(null);
  const {setToken} = useAuthContext();

  const handleLogin = async (credentials: LoginPayload): Promise<void> => {
    setLoading(true);
    setLoginError(null);
    try {
        const response: AuthResponse = await loginService(credentials);
        setToken(response.token);
    } catch (e) {
      const error = e as Error;  
      setLoginError(error.message);
      throw new Error(`${error.message}`)
    } finally {
      setLoading(false);
    }
  };

  return { handleLogin, loading, loginError };
};
