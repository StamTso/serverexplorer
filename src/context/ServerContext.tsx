import { useState, ReactNode } from 'react';
import { fetchServerList } from '../services/serverListService';
import { ServerContext } from '../hooks/useServerContext';
import { Server } from '../hooks/useServerContext';

export const ServerContextProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [servers, setServers] = useState<Server[] | null>(null);

  const fetchServers = async (token: string) => {
    try {
      const serverList = await fetchServerList(token);
      setServers(serverList);
    } catch (error) {
      console.error('Failed to fetch servers:', error);
    }
  };

  return (
    <ServerContext.Provider value={{ servers, fetchServers }}>
      {children}
    </ServerContext.Provider>
  );
};