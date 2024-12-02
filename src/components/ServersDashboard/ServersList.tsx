import { useEffect, useState } from 'react';
import { Server, ServersListProps } from './types';
import getCountryISO from '../../utils/getCountryISO';

const ServersList: React.FC<ServersListProps> = ({ servers }) => {
  const [serversList, setServersList] = useState<Server[]>([]);
  const [sortField, setSortField] = useState<'country' | 'distance' | ''>('');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc' | ''>('')

  useEffect(() => {
    setServersList(servers)
  }, [servers])

  const handleSort = (field: 'country' | 'distance') => {
    const order = sortField === field && sortOrder === 'asc' ? 'desc' : 'asc';
    const sorted = [...servers].sort((a, b) => {
      if (field === 'country') {
        return order === 'asc'
          ? a.name.localeCompare(b.name)
          : b.name.localeCompare(a.name);
      }
      return order === 'asc' ? a.distance - b.distance : b.distance - a.distance;
    });

    setServersList(sorted);
    setSortField(field);
    setSortOrder(order);
  };

  return (
    <div className='w-full max-w-4xl mx-auto p-4 bg-white rounded-lg shadow-lg'>
      <table className='w-full table-auto border-collapse'>
        <thead>
          <tr className='border-b text-gray-900 text-l sm:text-xl'>
            <th
              className='text-left px-4 py-2 cursor-pointer'
              onClick={() => handleSort('country')}
              data-testid='country-column'
            >
              Country name {sortField === 'country' ? (sortOrder === 'asc' ? '▲' : '▼') : ''}
            </th>
            <th
              className='text-right px-4 py-2 cursor-pointer'
              onClick={() => handleSort('distance')}
            >
              Distance {sortField === 'distance' ? (sortOrder === 'asc' ? '▲' : '▼') : ''}
            </th>
          </tr>
        </thead>
        <tbody>
          {serversList.map((server) => (
            <tr key={`${server.name}-${server.distance}`} className='border-b last:border-none leading-[2.5rem] text-gray-900 text-m sm:text-l sm:leading-[3rem]'>
              <td className='flex items-center mx-4 my-2'>
                <img
                  src={`https://flagcdn.com/${getCountryISO(server.name)}.svg`}
                  alt={`${server.name.split(' #')[0].trim()} flag`}
                  className='w-10 h-6 mr-3'
                />
                {server.name}
              </td>
              <td className='px-4 py-2 text-right'>{server.distance} km</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ServersList;

