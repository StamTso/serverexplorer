import { createContext, useContext } from 'react';

interface AuthContextType {
    token: string | null;
    isUserAuthenticated: boolean;
    setToken: (token: string | null) => void;
  }

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuthContext = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (!context) {
      throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
  };