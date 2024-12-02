import { useState, ReactNode } from 'react';
import { AuthContext } from '../hooks/useAuthContext';

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthContextProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [token, setToken] = useState<string | null>(null);

  // Calculate authentication status based on token presence
  const isUserAuthenticated = !!token;

  return (
    <AuthContext.Provider value={{ token, isUserAuthenticated, setToken }}>
      {children}
    </AuthContext.Provider>
  );
};
