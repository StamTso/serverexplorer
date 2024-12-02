import { createContext, useContext } from 'react';

export interface Server {
    name: string;
    distance: number;
  }

interface ServerContextType {
    servers: Server[] | null;
    fetchServers: (token: string) => Promise<void>;
  }

export const ServerContext = createContext<ServerContextType | undefined>(undefined);

export const useServerContext = () => {
  const context = useContext(ServerContext);
  if (!context) {
    throw new Error('useServerContext must be used within a ServerProvider');
  }
  return context;
};
